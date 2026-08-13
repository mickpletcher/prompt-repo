# AI CAD Design Book

## Purpose

Show how to drive CAD from clean text using ChatGPT as a drafting partner. Use the shipping container house upgrade as the live example. Readers should be able to export STEP, STL, DXF, and a BOM from written specifications.

## Outcomes

1. Write a short brief and strict JSON spec.
2. Validate the spec locally.
3. Build parametric geometry in FreeCAD.
4. Export STEP, STL, DXF, and a BOM.
5. Reuse the pipeline for other projects.

## Tooling

Use current stable FreeCAD, Python 3.11 or newer, Git, and VS Code. OpenSCAD is optional for scripted solids. Work locally and keep files in the repository.

## Repository layout

```text
ai_cad_design_book/
  book/chapters  book/figures
  cad/specs  cad/macros  cad/exports
  qa/validators
  bom
  tooling
```

## Source of truth

All geometry comes from one JSON spec per design. ChatGPT writes the JSON. Python reads it and builds the model.

## Response contract

For each design change, return the validated JSON spec, a concise change summary, validation results, affected export paths, and the next action. Label assumptions and unverified structural or code requirements. Do not overwrite approved geometry without showing the proposed change.

## Data contract

Keep the schema strict. Units are millimeters. Coordinates are nonnegative. Names use underscores.

```json
{
  "project_name": "container_deck_extension",
  "units": "mm",
  "tolerance_mm": 1.5,
  "materials": {
    "post": "pressure_treated_wood",
    "beam": "pressure_treated_wood",
    "joist": "pressure_treated_wood",
    "deck_board": "composite"
  },
  "components": [
    {"type":"post","size":{"x":140,"y":140,"z":1200},"positions":[{"x":0,"y":0,"z":0},{"x":2400,"y":0,"z":0},{"x":0,"y":4800,"z":0},{"x":2400,"y":4800,"z":0}]},
    {"type":"beam","size":{"x":2400,"y":90,"z":190},"positions":[{"x":0,"y":0,"z":1200},{"x":0,"y":4800,"z":1200}],"orientation":"x"},
    {"type":"joist","count":11,"spacing_mm":400,"size":{"x":90,"y":4800,"z":140},"origin":{"x":0,"y":0,"z":1200},"orientation":"y"},
    {"type":"deck_board","count":30,"spacing_mm":5,"size":{"x":2400,"y":140,"z":22},"origin":{"x":0,"y":0,"z":1340},"orientation":"x"}
  ],
  "exports": {"step":"cad/exports/deck.step","stl":"cad/exports/deck.stl","dxf_top":"cad/exports/deck_top.dxf"}
}
```

## Prompt templates

Brief:

```text
Write a concise brief for a container house deck extension.
Include footprint in mm, clear height, design loads, and material intent.
Return a short paragraph and a list of measurable facts.
```

Spec:

```text
Produce JSON that matches my schema.
Use mm only. Keep coordinates nonnegative.
Return only valid JSON with no comments.
```

Change:

```text
Update the prior JSON to reach near 400 mm joist spacing across a 4800 mm span.
Keep origins and orientations. Return only JSON.
```

## Validation checklist

1. Required fields are present and spelled correctly.
2. Units equal `mm`.
3. All sizes and counts are positive.
4. All coordinates are nonnegative.
5. Export paths land inside the repository.

## FreeCAD macro

Save as `cad/macros/build_from_json.FCMacro`.

```python
import json
import os
import FreeCAD as App
import Part

def make_box(name, sx, sy, sz, px, py, pz):
    box = Part.makeBox(sx, sy, sz)
    obj = App.ActiveDocument.addObject("Part::Feature", name)
    obj.Shape = box
    obj.Placement.Base = App.Vector(px, py, pz)
    return obj

def build_from_spec(spec_path):
    with open(spec_path, "r", encoding="utf8") as f:
        spec = json.load(f)
    doc = App.newDocument(spec["project_name"])
    made = []
    for comp in spec["components"]:
        kind = comp["type"]
        s = comp["size"]
        if kind == "post":
            for p in comp["positions"]:
                made.append(make_box(f"post_{p['x']}_{p['y']}", s["x"], s["y"], s["z"], p["x"], p["y"], p["z"]))
        if kind == "beam":
            for p in comp["positions"]:
                sx, sy = (s["x"], s["y"]) if comp.get("orientation") == "x" else (s["y"], s["x"])
                made.append(make_box(f"beam_{p['x']}_{p['y']}", sx, sy, s["z"], p["x"], p["y"], p["z"]))
        if kind == "joist":
            o = comp["origin"]
            for i in range(comp["count"]):
                x, y, z = o["x"], o["y"] + i * comp["spacing_mm"], o["z"]
                sx, sy = (s["x"], s["y"]) if comp.get("orientation") == "y" else (s["y"], s["x"])
                made.append(make_box(f"joist_{i}", sx, sy, s["z"], x, y, z))
        if kind == "deck_board":
            o = comp["origin"]
            for i in range(comp["count"]):
                x = o["x"] + i * (s["x"] + comp["spacing_mm"]) if comp.get("orientation") == "x" else o["x"]
                y = o["y"] + i * (s["y"] + comp["spacing_mm"]) if comp.get("orientation") == "y" else o["y"]
                made.append(make_box(f"deck_board_{i}", s["x"], s["y"], s["z"], x, y, o["z"]))
    doc.recompute()
    exports = spec["exports"]
    if exports.get("step"):
        Part.export(made, os.path.abspath(exports["step"]))
    if exports.get("stl"):
        Part.export(made, os.path.abspath(exports["stl"]))
    return made

# Example: build_from_spec("cad/specs/container_deck_extension.json")
```

## BOM script

Save as `bom/make_bom.py`.

```python
import csv
import FreeCAD as App

def write_bom(csv_path="bom/deck_bom.csv"):
    rows = []
    for obj in App.ActiveDocument.Objects:
        if hasattr(obj, "Shape"):
            b = obj.Shape.BoundBox
            rows.append([obj.Label, round(b.XLength, 1), round(b.YLength, 1), round(b.ZLength, 1)])
    with open(csv_path, "w", newline="", encoding="utf8") as f:
        writer = csv.writer(f)
        writer.writerow(["name", "x_mm", "y_mm", "z_mm"])
        writer.writerows(rows)

# write_bom()
```

## Chapter rhythm

1. Brief.
2. JSON.
3. Validate.
4. Build.
5. Export.
6. BOM.
7. Screenshot and lesson learned.

## Style rules

Write in the user's voice. Use short sentences and concrete verbs. Use mm for dimensions. Do not add AI filler or dash characters. Code must run as shown or be labeled pseudocode. Captions are simple and clear.

## Safety note

This is a design guide. Loads, soil, fasteners, frost, and local code are the reader's responsibility. Add callouts where those issues matter.

## Versioning

Tag each stable chapter.

```text
git init
git add .
git commit -m "chapter one first pass"
git tag v0.1
git push
```

## Monetization and IP

Text is under standard copyright. Code is under a permissive license. Offer a paid bundle with ready specs and macros for stairs, rails, gates, sheds, and deck modules. Offer a service that turns reader briefs into clean JSON and exports.

## First live example

Build a deck extension tied to the container wall. Use four posts, two beams, and joists at near 400 mm. Show the figure in FreeCAD. Ship STEP, STL, DXF, and a BOM.

## Quality bar

Every spec validates. Every macro run names solids. Exports open cleanly in a fresh FreeCAD session. The BOM lists all solids. Figures match outputs. Never manually edit exports.

## Next steps

Write chapter zero setup and repository. Write chapter one brief and first JSON. Write chapter two validator and first build. Write chapter three export and BOM. Then iterate on spacing, stairs, rails, and a simple shade frame.
