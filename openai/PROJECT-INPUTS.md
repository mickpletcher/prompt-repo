# OpenAI Project Inputs and Missing Information

This file records the information each OpenAI ChatGPT Project instruction set needs before it can produce project-specific work. The repository does not contain the missing project data unless listed under Available context. Do not treat examples or defaults as confirmed facts.

## Personal and sensitive information review

Direct personal identifiers and specific bodyweight values have been replaced
with placeholders. Location-specific project details have been generalized.
High school reunion files use placeholders and do not contain a school name,
class year, contact list, or attendee data. No email address, phone number, home
address, credential, API key, or account identifier is stored in the instruction
sets.

## CAD design book

File: `openai/instruction-sets/cad/ai-cad-design-book.md`

Required inputs:

- Design name, purpose, dimensions, loads, materials, tolerances, coordinate system, and required exports.
- FreeCAD and Python versions, repository path, and desired file layout.
- Engineering assumptions, connection details, site conditions, and applicable code requirements.

Missing from repository: a validated design brief, JSON spec, validator, FreeCAD installation, actual site measurements, structural loads, and approved export requirements.

Safe default: use the example container deck extension only as a demonstration. Label it as an example, not an approved structural design.

## ATS resume and cover letter

File: `openai/instruction-sets/career/ats-resume-and-cover-letter.md`

Required inputs:

- Full job posting, target role and company, candidate contact details, employment history, dates, accomplishments, tools, certifications, education, metrics, location, clearance, page limit, and requested deliverables.

Missing from repository: all candidate identity, career history, job posting, metrics, and contact information.

Safe default: use placeholders and never invent dates, employers, credentials, metrics, tools, salary, or clearance.

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

Safe default: create a platform-neutral draft and use placeholders for links, brands, guests, and claims.

## High school reunion

File: `openai/instruction-sets/events/high-school-reunion.md`

Required inputs:

- School name, class year, milestone, target date range, location, expected attendance, guest policy, budget, ticket range, committee roster, decision authority, venue preferences, accessibility needs, traditions, and non-negotiables.

Missing from repository: all event facts, committee decisions, classmate records, venue data, budget, and communications approvals.

Safe default: build a planning brief with clearly labeled assumptions and do not contact classmates, vendors, or venues without approval.

## AI trainer, nutritionist, and health analyst

File: `openai/instruction-sets/fitness/ai-trainer-nutrition-health.md`

Required inputs:

- Age, height, weight, training age, goals and target rate, equipment, schedule, injuries, medical conditions, medications, supplements, macro targets, InBody results, training feedback, sleep, and daily nutrition logs.

Missing from repository: the current profile, clinician guidance, medication list, supplements, goals, recent logs, InBody data, and approved workout and nutrition schemas.

Safe default: do not calculate personalized targets or change a plan until health context and clinical constraints are confirmed.

## Post-bariatric AI coach

File: `openai/instruction-sets/fitness/post-bariatric-ai-coach.md`

Required inputs:

- Current surgeon or dietitian protocol, cap status, clearance, current weight, symptoms, hydration and protein targets, medications and supplements, readiness data, equipment, travel mode, and recent session logs.

Missing from repository: current clinical clearance, care-team instructions, current measurements, symptoms, recent logs, and confirmation that the placeholder profile is complete.

Sensitive data note: this file concerns post-bariatric health and should be
customized only inside a private Project with the minimum necessary clinical
information.

Safe default: clinical instructions override the file. Treat embedded profile values as defaults requiring confirmation, not current medical facts.

## Voice strength and conditioning coach

File: `openai/instruction-sets/fitness/voice-strength-conditioning-coach.md`

Required inputs:

- Timebox, goal, equipment, injuries or limits, energy, soreness, recent top sets, HR sensor and safe max, swearing preference, and the latest session log.

Missing from repository: current training history, health limits, equipment, preferred voice settings, and Project Files containing prior logs.

Safe default: use conservative loads, RPE caps, and a safety clarification when medical clearance or symptoms are unknown.

## HVAC troubleshooting

File: `openai/instruction-sets/hvac/hvac-troubleshooting.md`

Required inputs:

- Symptom, equipment type, brand, model, age, operating mode, recent service, error codes, photos, measurements, and tests already performed.

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

Safe default: treat all major electrical and plumbing upgrades as unapproved until measured and verified. Prefer modern UL/ETL-listed control packs and heaters that match the existing shell and service, but never assume the 1994 label is code-compliant or safe without verification.

## Patent development assistant

File: `openai/instruction-sets/legal/patent-development-assistant.md`

Required inputs:

- Invention disclosure, inventor names and residences, ownership, conception dates, public disclosures, priority claims, embodiments, drawings, technical advantages, target jurisdictions, prior-art results, and attorney instructions.

Missing from repository: all invention facts, inventor and ownership data, filing dates, search results, drawings, and USPTO form information.

Safe default: produce attorney-review drafts only. Never infer inventorship, priority, deadlines, patentability, or filing readiness.

## Bariatric recipe and meal planner

File: `openai/instruction-sets/nutrition/bariatric-recipe-meal-planner.md`

Required inputs:

- Surgery type, post-op stage, time since surgery, care-team protocol, macro targets, per-meal volume, hydration and electrolyte rules, allergies, intolerances, exclusions, goals, budget, equipment, cuisine, shopping frequency, and label concerns.

Missing from repository: the user's current stage, clinical protocol, targets, tolerance, allergies, and food preferences.

Safe default: ask for stage and clinical restrictions before recommending food. Label all nutrition estimates and defer to the care team.

## Modular truck bed rack designer

File: `openai/instruction-sets/vehicle/truck-bed-rack-designer.md`

Required inputs:

- Truck year, make, model, cab and bed configuration, rail dimensions, basket model and mounting spread, roof and cab clearances, tubing material and wall thickness, tools, fabrication skill, load cases, and intended road use.

Missing from repository: truck measurements, Yakima specifications, actual load cases, material selection, fabrication capability, and professional review.

Safe default: do not produce a final cut list or claim road readiness until measurements and manufacturer limits are verified.

## Epilepsy memoir development

File: `openai/instruction-sets/writing/epilepsy-memoir-development.md`

Required inputs:

- Intended audience, genre and length, timeline, chapter drafts, desired voice, medical records available for verification, permission status for other people, source preferences, publication route, budget, and marketing goals.

Missing from repository: manuscript drafts, medical records, source list, consent decisions, publishing plan, and author preferences.

Sensitive data flag: future drafts may contain health information and identifiable patient or family details. Keep them out of public repositories unless explicitly reviewed and consented.

Safe default: use placeholders, anonymize third parties, and separate documented facts from memory and interpretation.
