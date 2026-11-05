# OpenAI Project Inputs and Missing Information

This file records the information each OpenAI ChatGPT Project instruction set needs before it can produce project-specific work. The repository does not contain the missing project data unless listed under Available context. Do not treat examples or defaults as confirmed facts.

## Personal and sensitive information review

Some sets are general templates; others intentionally retain Mick's project
baseline, including names, locations, equipment, and biographical examples.
These details are not verified current facts for a new user or a new project.
Review and replace them before reuse or sharing. Use only the minimum personal,
clinical, or operational information needed, and never supply credentials.
The reunion set uses placeholders and contains no attendee list.

## CAD design book

File: `openai/instruction-sets/cad/ai-cad-design-book.md`

Required inputs:

- Design name, purpose, dimensions, loads, materials, tolerances, coordinate system, and required exports.
- FreeCAD and Python versions, repository path, and desired file layout.
- Engineering assumptions, connection details, site conditions, applicable code requirements, strict schema/validator, and approval for file overwrites or Git delivery.

Missing from repository: a validated design brief, JSON spec, validator, FreeCAD installation, actual site measurements, structural loads, and approved export requirements.

Safe default: treat the example as a geometry demonstration and the code as unverified prototypes. The sample has no DXF exporter or complete validator. Do not claim exports, a procurement BOM, or construction readiness without implementation and actual verification.

## ATS resume and cover letter

File: `openai/instruction-sets/career/ats-resume-and-cover-letter.md`

Required inputs:

- Full job posting, target role and company, candidate contact details, employment history, dates, accomplishments, tools, certifications, education, metrics, location, clearance, page limit, and requested deliverables.

Missing from repository: all candidate identity, career history, job posting, metrics, and contact information.

Safe default: reuse supplied facts, request only missing information for the current deliverable, and never invent credentials or accomplishments. Use implied first person for resumes and natural first person for cover letters. Return text when file creation is unavailable; do not claim ATS parsing was tested.

## Container home expansion

File: `openai/instruction-sets/container-home/container-home-expansion.md`

Required inputs:

- County and municipality, parcel or site constraints, existing container layout, proposed container sizes and condition, foundation and soil data, surveys, utility service, septic, floodplain, climate loads, budget, timeline, DIY scope, and professional contacts.
- Existing electrical, plumbing, HVAC, solar, deck, structural, and permit records.
- Retirement accessibility priorities, occupancy, storage, parking, and amenity decisions.

Missing from repository: exact site, county, survey, soil report, permits, as-built drawings, utility capacities, structural calculations, budget, schedule, and approved layout.

Safe default: produce planning options only and require local code, engineering, and contractor verification before construction.

## AI prompt engineering media creator

File: `openai/instruction-sets/content/ai-prompt-engineering-media-creator.md`

Required inputs:

- Episode topic, audience level, platform, target length, tools or models, source material, brand voice, publishing schedule, rights status, and approval workflow.

Missing from repository: show name, channel links, audience analytics, visual identity, recording stack, publishing accounts, automation stack, and content calendar.

Safe default: create a platform-neutral draft for the requested format, answer small follow-ups directly, and use placeholders for missing facts. Without tool or model testing, label demonstrations illustrative and outputs expected.

## High school reunion

File: `openai/instruction-sets/events/high-school-reunion.md`

Required inputs:

- School name, class year, milestone, target date range, location, expected attendance, guest policy, budget, ticket range, committee roster, decision authority, venue preferences, accessibility needs, traditions, and non-negotiables.

Missing from repository: all event facts, committee decisions, classmate records, venue data, budget, and communications approvals.

Safe default: build a planning brief with labeled assumptions, reuse approved decisions, and do not contact anyone without authorization. Review risks during interactions; claim background reminders or monitoring only after authorized setup succeeds.

## AI trainer, nutritionist, and health analyst

File: `openai/instruction-sets/fitness/ai-trainer-nutrition-health.md`

Required inputs:

- Age, height, weight, training experience, goals, equipment, schedule, relevant clinical restrictions, confirmed nutrition targets or permission to estimate them, InBody measurement context, feedback, sleep, and supplied logs. Medication context is voluntary and limited to what the task needs.
- Approved private record location, available file tools, and workout/nutrition schemas if exports are requested.

Missing from repository: the current profile, clinician guidance, medication list, supplements, goals, recent logs, InBody data, and approved workout and nutrition schemas.

Safe default: do not calculate personalized targets or change a plan until health context and clinical constraints are confirmed.

## Post-bariatric AI coach

File: `openai/instruction-sets/fitness/post-bariatric-ai-coach.md`

Required inputs:

- Current surgeon or dietitian protocol with permitted textures, prescribed calorie target/range or cap and date, confirmed exercise clearance and limits, symptoms, hydration/protein/fiber targets, relevant medication context, actual activity data, equipment, and recent logs.
- Baseline and nonzero standard deviations if using the optional readiness heuristic; private record location and available save tools.

Missing from repository: current clinical clearance, care-team instructions, current measurements, symptoms, recent logs, and confirmation that the placeholder profile is complete.

Sensitive data note: this file concerns post-bariatric health and should be
customized only inside a private Project with the minimum necessary clinical
information.

Safe default: keep clinical limits, clearance, and missing activity data unknown until confirmed. No universal 1,000 kcal prescription or assumed exercise clearance applies. Stop exercise for red flags and escalate appropriately; do not replace medical assessment with a deload.

## Voice strength and conditioning coach

File: `openai/instruction-sets/fitness/voice-strength-conditioning-coach.md`

Required inputs:

- Timebox, goal, equipment, injuries or limits, energy, soreness, recent top sets, supplied HR and any clinician-defined limit, swearing preference, and latest session log.
- Available voice, timer, text display, file, and hashing tools; otherwise use user timing, text output, and unknown values.

Missing from repository: current training history, health limits, equipment, preferred voice settings, and Project Files containing prior logs.

Safe default: confirm relevant limits, use conservative training, and never infer reps, fatigue, or sensor data from silence. Use the requested timebox instead of a fixed platform limit. Emergency symptoms stop exercise; exports and checksums are claimed only when actually produced.

## HVAC troubleshooting

File: `openai/instruction-sets/hvac/hvac-troubleshooting.md`

Required inputs:

- Symptom, equipment type, brand, model, operating mode, service history, error codes, readable wiring diagrams/manuals, measurements, tests already performed, and qualifications/equipment for any proposed hazardous test.

Missing from repository: all equipment identity, wiring diagrams, readings, fault history, and current symptoms.

Safe default: begin with non-invasive observations and safety checks. Do not advise live electrical testing unless the user is qualified and the risk is appropriate.

## Hot tub modernization and component upgrade

File: `openai/instruction-sets/hot-tub/hot-tub-project-instructions.md`

Required inputs:

- Tub age, shell condition, current photos, equipment labels, brand/model data, installed control pack, heater, pumps, blower, ozone or UV system, sanitizer setup, filter type, cover, jet count, plumbing layout, and service history.
- Existing electrical details: service voltage, breaker size, feeder conductor and length, GFCI type, disconnect, grounding and bonding, load calculations, and current label data.
- Compatibility measurements: heater union size and face-to-face length, pump suction and discharge sizes, PVC outside diameter, equipment-bay dimensions, topside cutout size, pump centerline height, breaker rating, supply voltage, conductor size, and pump nameplate data.
- Project goals, budget target, reliability priorities, desired automation, whether the shell and existing plumbing should be retained, and any local code or permit requirements.

Missing from repository: exact manufacturer/model data, current wiring and breaker details, actual measurements, photos, leak history, and verified code-compliance status.

Safe default: treat the embedded baseline as a historical report requiring current confirmation. Use non-invasive checks first and the locally adopted code edition. Treat all major electrical and plumbing upgrades as unapproved until measured and verified. Prefer modern UL/ETL-listed control packs and heaters that match the existing shell and service, but never assume the 1994 label is code-compliant or safe without verification.

## Patent development assistant

File: `openai/instruction-sets/legal/patent-development-assistant.md`

Required inputs:

- Invention disclosure, inventor names and residences, ownership, conception dates, public disclosures, priority claims, embodiments, drawings, technical advantages, target jurisdictions, prior-art results, and attorney instructions.

Missing from repository: all invention facts, inventor and ownership data, filing dates, search results, drawings, and USPTO form information.

Safe default: produce attorney-review drafts only. Never infer inventorship, priority, deadlines, patentability, or filing readiness.

## Bariatric recipe and meal planner

File: `openai/instruction-sets/nutrition/bariatric-recipe-meal-planner.md`

Required inputs:

- Surgery type, time since surgery, care-team stage name and explicitly permitted textures, macro targets, portions, hydration/electrolyte rules, allergies, intolerances, preferences, budget, and equipment. Stage number alone is insufficient; full liquids and purees require distinct confirmation.

Missing from repository: the user's current stage, clinical protocol, targets, tolerance, allergies, and food preferences.

Safe default: confirm permitted textures, allergies, and clinical restrictions before recommending food. Do not advance texture based on a generic stage number. Label all nutrition estimates and defer to the care team.

## Modular truck bed rack designer

File: `openai/instruction-sets/vehicle/truck-bed-rack-designer.md`

Required inputs:

- Truck year, make, model, cab and bed configuration, rail dimensions, basket model and mounting spread, roof and cab clearances, tubing material and wall thickness, tools, fabrication skill, load cases, and intended road use.

Missing from repository: truck measurements, Yakima specifications, actual load cases, material selection, fabrication capability, and professional review.

Safe default: do not produce a final cut list or claim road readiness until measurements and manufacturer limits are verified.

## Outdoor gym

File: `openai/instruction-sets/outdoor-gym/outdoor-gym-project-instructions.md`

Available context: Mick's location, frame dimensions, equipment concepts, model requirements, and decision labels. These are project-specific inputs, not general construction specifications.

Required inputs: site/soil and load data, local approval requirements, foundation and connection design, user clearances, bar diameter meaning, budget, and current model/files.

Missing from repository: the model, site evidence, engineered load paths, footing/anchorage design, and construction approval.

Safe default: preserve confirmed decisions, label modeled details conceptual, and do not issue construction-ready foundations or connections without evidence.

## Personal website

File: `openai/instruction-sets/personal-website/personal-website-instruction-set.md`

Available context: Mick's intended voice, design direction, page structure, and biographical examples to verify.

Required inputs: current site files/URL, source records for claims, requested edit, publication/privacy decisions, available tools, and local versus published delivery authority.

Missing from repository: the actual site, supporting sources, current accessibility/browser results, and approval to publish sensitive stories.

Safe default: draft or edit only the requested local scope. Do not infer permission to publish health, employer, client, third-party, or private-location details.

## Tennessee LLE exam preparation

File: `openai/instruction-sets/tennessee-lle/tennessee-lle-exam-prep-instructions.md`

Available context: a dated Prov reference baseline, 40-question study matrix, commands, and coaching readiness thresholds.

Required inputs: appointment provider/date, current bulletin, exact approved book editions, available references, ordered domain-answer history, mock results, and user-reported timing.

Missing from repository: the user's books, appointment, current progress file, and verified answers for future drills.

Safe default: verify provider-specific rules and editions before advice. Do not treat supplemental books as approved references. Mark readiness insufficient until the specified mock and domain samples exist.

## Trading automations

File: `openai/instruction-sets/trading/trading-automations-project-instructions.md`

Required inputs: repository, requested workflow, markets/venues, data rights, strategy and risk limits, reproducible datasets, test environment, and exact external account/action authorization.

Missing from repository: strategy evidence, current market data, integrations, credentials capability, deployment state, and account permissions.

Safe default: research and local simulation. Broker paper orders also require external-action approval. Never claim active monitoring, verified integration, or live performance from a design or backtest.

## Epilepsy memoir development

File: `openai/instruction-sets/writing/epilepsy-memoir-development.md`

Required inputs:

- Intended audience, genre and length, timeline, chapter drafts, desired voice, medical records available for verification, permission status for other people, source preferences, publication route, budget, and marketing goals.

Missing from repository: manuscript drafts, medical records, source list, consent decisions, publishing plan, and author preferences.

Sensitive data flag: future drafts may contain health information and identifiable patient or family details. Keep them out of public repositories unless explicitly reviewed and consented.

Safe default: use placeholders, anonymize third parties, and separate documented facts from memory and interpretation.
