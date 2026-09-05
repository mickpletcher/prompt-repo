# Assessment

Updated: 2026-09-05

## Purpose

Prompt Repo is a Markdown library of reusable prompts and OpenAI ChatGPT Project instruction sets for development, automation, planning, content, fitness, construction, legal, career, and other workflows. Its engineering prompts cover repository governance, CI diagnosis, pull request reconciliation, dependency updates, implementation, live operations, Windows connectivity, desktop releases, public documentation, source audits, evidence triage, product research, privacy, and physical-device safety.

## Structure

- `prompts/`: reusable one-time prompts and prompt input guidance.
- `openai/instruction-sets/`: persistent ChatGPT Project instructions grouped by subject.
- `.github/`: repository governance, workflows, catalog automation, and tests.
- `changelog.md`: canonical repository history and current changes.

## Automation and validation

- The README resource catalog is generated from Markdown files.
- Catalog discovery handles recursive folders and OneDrive reparse points.
- Catalog and local-link tests run with Node's built-in test runner.
- CI validates local Markdown links and lints Markdown across the repository.
- CodeQL scans the JavaScript repository automation.
- GitHub Actions use read-only lint permissions and pinned action SHAs.

## Current health

The repository is documentation-first. It has no application build or runtime dependency; its JavaScript maintenance scripts use only Node.js built-ins. Catalog tests and local-link validation pass. Markdown lint passes for the 55 library/support files; the full 56-file check reports 10 pre-existing formatting issues in the unchanged, untracked review-request draft. Instruction sets include domain-specific safety, approval, privacy, and professional-review boundaries where needed.

## Known limitations

- Most content requires user-specific project inputs before it can produce final work.
- External-link reachability, prompt schemas, and content freshness are not yet checked automatically.
- GitHub settings require access to verify and change.
- The 2026-09-01 assessment recorded an administrator bypass permitting direct pushes to `main`; this local content review did not reverify GitHub settings. Project guidance reserves bypass use for recovery.

## Prompt library review: 2026-09-05

Reviewed all 41 content resources: 23 task prompts and 18 persistent Project instruction sets. Dispositions: **30 Improve, 11 Keep, 0 Defer**. Indexes and input guides are supporting documentation, excluded from those counts. Every content file was read against its actual purpose, input needs, output contract, tool assumptions, authorization, privacy, and domain boundaries. Persistent sets were also checked for startup, continuity, changed requirements, and proportionate follow-ups.

This is a local, uncommitted review of the working tree based on `f92203bb13dd3d9663f13c41165c24cfb1f2e1c3`. Pre-existing tracked changes in README, changelog, and the task input guide were preserved. The existing untracked context-pack prompt and review-request draft were retained unchanged. Embedded workflows were treated as source, not executed. The library remains model-neutral.

### Disposition ledger

Each Improve row records the original defect and expected practical benefit. Keep means the existing contract was adequate for this review, not that all future executions or external claims are certified.

| Resource | Decision | Defect addressed or reason to keep |
| --- | --- | --- |
| [Automation kickoff](prompts/automation/automation-project-agent-kickoff-prompt.md) | Improve | Blanket automation and full documentation rewrites lacked scope inputs; backlog replacement demanded invented ideas. Adds scoped execution and activation, existing authorities, evidence, and partial-item handling. |
| [OpenClaw setup](prompts/automation/openclaw-secure-setup-runbook.md) | Improve | A real token appeared in process arguments and a generic probe could succeed against another target. Uses configured secrets, exact-target evidence, explicit negative-test limits, and dated compatibility claims. |
| [Unattended automation audit](prompts/automation/unattended-automation-reliability-audit.md) | Improve | Assessment and failure tests could trigger live work. Defines no-edit assessment and separately approved isolated tests while retaining business-outcome checks. |
| [Screenshot triage](prompts/diagnostics/screenshot-evidence-triage.md) | Keep | Separates visible evidence, task intent, missing context, and untrusted image text; preserves scoped diagnosis and uncertainty. |
| [Novice README and distribution](prompts/documentation/novice-ready-readme-and-distribution-review.md) | Improve | Assumed publishing tokens enforce branch scope. Separates repository/permission scope from approved-ref checks without weakening publishing isolation or novice deliverables. |
| [GitHub settings audit](prompts/github/GitHub-Repository-Settings-Audit.md) | Improve | Audit implied edits and PR publication without a selected mode. Adds assessment/apply scope, local delivery, existing approval, dirty-work preservation, and workflow review. |
| [Dependency updates](prompts/github/dependency-update-triage-and-merge.md) | Improve | Corrects the branch-scoped-token assumption; preserves update classification, exact-head checks, and merge authorization. |
| [Actions diagnosis](prompts/github/github-actions-failure-diagnosis-and-repair.md) | Improve | Corrects the branch-scoped-token assumption; keeps exact failure evidence, reproduction, scoped fixes, and hosted validation gates. |
| [Social preview](prompts/github/github-social-preview-production.md) | Improve | Corrects the branch-scoped-token assumption while retaining asset, upload, and publication approval boundaries. |
| [PR and branch reconciliation](prompts/github/pull-request-and-branch-reconciliation.md) | Improve | Corrects token scope and ancestry-only cleanup assumptions. Checks delivered squash/rebase changes, later commits, and a fresh branch tip before deletion. |
| [Physical-device readiness](prompts/hardware/physical-device-change-readiness-gate.md) | Keep | Explicit planning boundary, independent evidence, recovery, failure tests, and physical-write authorization remain appropriate. |
| [Backlog implementation](prompts/implementation/safe-backlog-item-implementation.md) | Improve | Unspecified delivery and draft/ready/merge meanings were ambiguous. Defaults local and uncommitted, preserves mandatory publication gates, and separates cleanup authority. |
| [Specification implementation](prompts/implementation/specification-to-working-repository.md) | Improve | Corrects the branch-scoped-token assumption without changing acceptance criteria, isolated validation, or delivery gates. |
| [Live configuration change](prompts/operations/safe-live-configuration-change.md) | Keep | Concrete read-only baseline, exact mutation scope, rollback, concurrency checks, and verification already govern live changes. |
| [PowerShell REST readiness](prompts/powershell/powershell-rest-api-production-readiness.md) | Improve | Assessment could imply adding tests or fixes. Defines no-edit assessment, approved local implementation, unavailable-tool reporting, and separate live/API publication authority. |
| [Repository context pack](prompts/project-governance/repository-ai-context-pack.md) | Keep | Existing untracked work already provides assessment/generation modes, derived-source limits, evidence routing, and explicit delivery. Preserved byte-for-byte. |
| [Living documentation standard](prompts/project-governance/software-project-living-documentation-standard.md) | Improve | Resolves conflicting small-change checks, main-only editing, waivers, tier requirements, scoped instructions, and document retirement. Version 2.3 labels the sample checker as partial evidence and preserves agreement history. |
| [Project assessment/remediation](prompts/project-review/software-project-assessment-and-remediation.md) | Improve | Reconfirmed approval already supplied. Uses existing scoped authorization and asks only for new decisions while retaining assessment-only stopping behavior. |
| [Desktop release readiness](prompts/release/cross-platform-desktop-release-readiness.md) | Keep | Distinguishes platform/build evidence from unexecuted browser, installer, signing, and live delivery gates. |
| [Product comparison](prompts/research/evidence-based-product-comparison.md) | Keep | Material constraints, current primary evidence, assumptions, weighted comparison, and missing-information handling already match the task. |
| [Official source audit](prompts/research/official-source-and-data-catalog-audit.md) | Keep | Provenance, coverage, freshness, uncertainty, and approved publication are already distinct and observable. |
| [Local privacy safety review](prompts/security/privacy-first-local-tool-safety-review.md) | Improve | Assessment wording implied edits and test additions. Makes assessment no-edit, implementation scoped, and tests isolated while preserving local/private-data protections. |
| [Remote connectivity diagnosis](prompts/windows/remote-service-connectivity-diagnosis.md) | Keep | Layered reachability/auth diagnosis, sanitized inputs, and configuration-mutation limits already support evidence-based troubleshooting. |
| [CAD design book](openai/instruction-sets/cad/ai-cad-design-book.md) | Improve | Repeated members used the wrong axes and exceeded the example footprint; validation/export claims exceeded the code. Defines world axes, fixes spacing, labels prototypes/missing DXF, and scopes file/Git actions. |
| [Resume and cover letter](openai/instruction-sets/career/ats-resume-and-cover-letter.md) | Improve | Resume pronoun prohibition leaked into letters; every request implied full intake and files. Separates voices, requested deliverables, and actual file/ATS verification. |
| [Container home](openai/instruction-sets/container-home/container-home-expansion.md) | Keep | Measured inputs, conceptual versus final design, engineering/code review, and narrow follow-up behavior are already explicit. |
| [Prompt-engineering media](openai/instruction-sets/content/ai-prompt-engineering-media-creator.md) | Improve | Every reply required an episode template and demonstrations could look measured. Limits full format to drafts, reuses current context, and labels illustrative results. |
| [Reunion planning](openai/instruction-sets/events/high-school-reunion.md) | Improve | Continuous monitoring implied background capability. Limits ordinary risk review to sessions and requires successful authorized scheduling before claiming reminders. |
| [AI trainer and nutrition](openai/instruction-sets/fitness/ai-trainer-nutrition-health.md) | Improve | Fixed adherence/body-composition rules implied clinical certainty and automatic changes. Uses confirmed targets, comparable observations, product-specific medication guidance, unknown values, and actual saves. |
| [Post-bariatric coach](openai/instruction-sets/fitness/post-bariatric-ai-coach.md) | Improve | A universal calorie cap, assumed activity, conflicting macro examples, and deloads for red flags could override care. Requires current clinical limits, labels readiness heuristic, and stops exercise for red flags. |
| [Voice coach](openai/instruction-sets/fitness/voice-strength-conditioning-coach.md) | Improve | Assumed fixed platform duration, timers/files, inferred fatigue, and emergency cooldowns. Uses available capabilities and reported actuals, preserves rest, and distinguishes emergency stops from training adjustment. |
| [Hot tub](openai/instruction-sets/hot-tub/hot-tub-project-instructions.md) | Improve | Historical equipment/photos appeared verified; newest code and electrical tests lacked local/procedural qualification. Confirms baseline and adopted code, starts non-invasively, and gates hazardous measurements. |
| [HVAC troubleshooting](openai/instruction-sets/hvac/hvac-troubleshooting.md) | Improve | Rigid diagnostic/report order, guessed probabilities, and unsupported probe points. Uses symptom-specific tests, exact manuals, qualifications, uncertainty, and concise follow-ups. |
| [Patent development](openai/instruction-sets/legal/patent-development-assistant.md) | Keep | Drafting and research remain separate from verified patentability, counsel decisions, filing, and confidential disclosure. |
| [Bariatric meal planner](openai/instruction-sets/nutrition/bariatric-recipe-meal-planner.md) | Improve | Stage numbers conflated full liquids and purees. Uses care-team texture permissions, clinical escalation, and proportionate follow-ups while retaining nutrition estimates and full-plan exports. |
| [Outdoor gym](openai/instruction-sets/outdoor-gym/outdoor-gym-project-instructions.md) | Keep | Deliberate project dimensions, decision labels, model requirements, and engineering boundaries are useful specificity. No purpose-changing generalization justified. |
| [Personal website](openai/instruction-sets/personal-website/personal-website-instruction-set.md) | Improve | Biographical examples could become unsupported public claims and local work implied broader delivery. Adds source/privacy decisions, scoped edits, and separate publication authority. |
| [Tennessee LLE](openai/instruction-sets/tennessee-lle/tennessee-lle-exam-prep-instructions.md) | Improve | Default books came from the wrong reference list; rolling readiness lacked ordered history. Corrects the dated Prov list, records editions, requires sample sufficiency, and uses literal section search. |
| [Trading automation](openai/instruction-sets/trading/trading-automations-project-instructions.md) | Improve | Paper trading appeared within an offline default and monitoring appeared automatic. Separates local simulation from broker actions and verified services; updates only stale documentation. |
| [Truck rack design](openai/instruction-sets/vehicle/truck-bed-rack-designer.md) | Improve | Every follow-up required a complete package. Gives focused answers while reusing measurements and rechecking affected fit/load assumptions. |
| [Epilepsy memoir](openai/instruction-sets/writing/epilepsy-memoir-development.md) | Improve | Small line edits inherited a full review format. Answers the requested scope while retaining author voice, factual limits, privacy, and publication decisions. |

### Scenario reviews

Compared each original and revision using the synthetic cases below: **90 scenario reviews across 30 revised resources**. The review found the expected corrections represented in the revised instructions and the useful original requirements retained. These are static editorial judgments, not executed model evaluations, measured quality/speed improvements, clinical validation, or live integration tests.

| Revised resource | Normal request and expected behavior | Missing-input case and expected behavior | Failure or boundary case and expected behavior |
| --- | --- | --- | --- |
| Automation kickoff | Approved local export automation: implement, validate, and update stale authorities. | No implementation scope: return assessment/proposal. | Scheduler activation absent; partial acceptance: leave activation pending and backlog item open. |
| OpenClaw setup | Authorized local setup: use configured secret and confirm intended Gateway/RPC target. | Installed help or isolated client missing: report auth/compatibility checks unverified. | Another target responds or cached identity masks invalid token: do not count it as negative-test success. |
| Unattended audit | Review synthetic job history against freshness and business output. | No approved test environment: continue static review and list unexecuted tests. | Suggested replay would send a real notification: do not trigger it in assessment. |
| Novice README | Approved docs/package work: retain novice setup and artifact verification. | Constrained publication environment unavailable: leave publication pending. | Repository token permits other refs: still verify approved branch and protections. |
| GitHub settings audit | Apply an already approved description change; local file edits remain uncommitted. | No mode/scope: inspect and report only. | Findings suggest visibility change or PR merge: require that exact authority; do not infer it from audit. |
| Dependency updates | Approved update: retain compatibility tests and exact reviewed head before merge. | No safe credential boundary: report Git delivery outstanding. | Token can write other branches: independently enforce the selected ref and protections. |
| Actions diagnosis | Reproduce a synthetic CI failure and implement only the approved repair. | No constrained publishing access: retain local result and report hosted checks pending. | Broad token capability: do not treat it as permission for another branch. |
| Social preview | Create the approved asset with existing dimensions and visual checks. | Publication boundary unavailable: deliver local asset, report upload pending. | Credential allows other refs: scope Git publication separately; upload still needs its authority. |
| PR reconciliation | Squash-merged PR: compare verified head and delivered changes before approved cleanup. | Delivery evidence missing: retain branch and report uncertainty. | Later commits or a changed tip: stop deletion; operation-specific approval still applies. |
| Backlog implementation | Named approved item with no delivery selection: complete local edits and checks, no commit. | Acceptance evidence missing: keep the item open and report the gap. | Draft PR with a mandatory publication failure: do not publish; merge does not imply branch deletion. |
| Specification implementation | Approved spec delivery: preserve acceptance matrix and scoped implementation. | Publishing environment missing: leave delivery unfinished. | Token is repository-wide: verify approved ref separately and retain workflow-execution checks. |
| PowerShell REST | Approved fix: implement targeted Pester cases and preserve TLS/retry rules. | Mode or integration tools missing: assess only and label unavailable checks. | Test would mutate a controller: local fix authority does not permit the live call. |
| Living documentation | Class 2 change: map existing authorities, validate, and refresh integrated assessment through normal review. | Tier 0 or absent Git history: avoid higher-tier scaffolding; report missing age evidence as not assessed. | Checker omits a required responsibility or safety check is unavailable: no compliance claim or automatic waiver; preserve scoped rules and contractual history. |
| Project assessment | Approved finding: proceed with its repair using the supplied approval. | Finding scope ambiguous: ask only about that finding and continue independent work. | Assessment-only request: stop before remediation as before. |
| Privacy safety review | Approved local fix: use isolated fixtures and allowlisted outputs. | No implementation approval: propose tests and controls without edits. | Requested test opens a real profile or uploads raw data: preserve separate authorization/privacy gates. |
| CAD book | Example geometry: repeat joists across X and deck boards across Y within the stated footprint. | No schema or FreeCAD: return draft with validation/export work unexecuted. | Path escape, unapproved overwrite, or absent DXF exporter: no successful full-package claim; construction/Git gates remain. |
| Resume/letter | Tailored letter: natural first person with verified candidate evidence. | No job facts or file tools: request relevant facts or return text, no invented PDF/ATS result. | Single bullet revision: preserve factual boundaries without restarting full intake or adding a letter. |
| Media creator | Requested episode: retain title, value, hook, segments, examples, and takeaway. | No model testing: label examples illustrative and results expected. | User changes only a title: update that title without the full episode template or publication. |
| Reunion | Planning session: review risks and approved committee decisions. | No scheduler: provide a usable schedule and state no reminder is active. | Vendor outreach not approved: draft only; reminder approval does not authorize unrelated contact. |
| AI trainer | Supplied session/food logs: separate planned and actual values and propose supported adjustments. | No targets, measurements, or save tools: clarify/label estimates and return unknowns or JSON. | Small InBody change or low adherence plus safety concern: no automatic calorie prescription or safety lockout. |
| Post-bariatric coach | Current protocol and clearance supplied: produce a plan within the full prescribed range. | Cap/clearance or readiness baseline missing: request required clinical inputs, do not invent steps or score. | Chest pain or conflicting clinical update: stop exercise/escalate; no deload substitute or automatic removal of all limits. |
| Voice coach | Available voice plus user timer: coach the timebox and log reported work. | No timer, sensor, hashing, or file tool: use user timing/text and unknown fields. | Silence or chest pain: do not shorten rest or infer reps; emergency symptoms stop exercise. |
| Hot tub | Current labels/manuals supplied: compare compatible parts against confirmed service. | Historical photos unavailable: identify baseline as reported, request current evidence. | Unqualified energized measurement or unknown adopted code: pause dependent work and retain safe observations. |
| HVAC | Follow-up voltage reading: explain evidence and next model-specific safe test. | Manual/terminal label missing: do not invent probe points. | Hazard overrides normal test order; no qualifications: keep hazardous tests for a technician. |
| Meal planner | Confirmed purees, targets, allergies: provide recipe and estimated nutrition/exports. | Only 'stage 2' supplied: clarify permitted textures before food recommendations. | Severe symptoms or liquid-only protocol: clinical assessment and texture limits override substitutions; narrow edits stay concise. |
| Website | Requested local copy edit: preserve verified voice and existing dirty work. | Source records or file tools absent: draft and label unverified claims/checks. | Health/client story or deployment suggested: verify public-copy permission and separate delivery authority. |
| Tennessee LLE | Confirmed Prov appointment: use its reference list, edition, and 40-question matrix. | Fewer than three mocks or 20/domain: readiness remains insufficient; unavailable bulletin rules stay unverified. | Supplemental book or changed edition: do not call it approved or silently mix scores; confirm exact alternate policy. |
| Trading | Reproducible offline backtest: retain risk, auditability, and probabilistic reporting. | Current market feed or service tools missing: continue offline and report unverified integration. | Broker paper order or monitoring activation: require exact external authority and verify setup. |
| Truck rack | Complete design request: retain package and structural/manufacturer checks. | Measurements missing: no final cut list or road-readiness claim. | User changes width only: update affected fit/load reasoning without regenerating unrelated material. |
| Memoir | Substantial chapter review: retain editorial analysis and factual/ethical limits. | Event details absent: ask or mark uncertainty; never invent autobiography. | One-sentence rewrite: preserve established voice and facts without a full review or disclosure. |

### Primary-source checks and remaining limits

- GitHub documents repository selection and permission scope for fine-grained tokens. Branch/ref authorization and protections must be checked separately. This correction appears in six publishing prompts. [GitHub token documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
- Project sources and voice features depend on the available interface and tools. Instructions now avoid guaranteed local-folder access, persistence, timers, simultaneous text, and a universal 60-minute cutoff. [ChatGPT Projects](https://learn.chatgpt.com/docs/projects), [voice documentation](https://learn.chatgpt.com/docs/features/voice).
- Bariatric nutrition and exercise depend on the treating team's protocol. Removed a universal calorie prescription and separated texture stages; emergency symptoms no longer lead to continued exercise. [UCSF bariatric dietary guidance](https://www.ucsfhealth.org/health-articles/dietary-guidelines-after-bariatric-surgery), [ASMBS guidance](https://asmbs.org/patients/life-after-bariatric-surgery/), [AHA emergency guidance](https://www.heart.org/en/health-topics/house-calls/when-to-call-911). Body-composition interpretation now considers comparable measurement conditions. [InBody preparation](https://inbodyusa.com/wp-content/uploads/Preparatory-Steps-Flyer_v1.2_no-bleed.pdf).
- The Tennessee Board and Prov's June 15, 2026 bulletin identify the LLE format and its reference list. The correction uses the LLE page, not another contractor exam's list; temporary alternate-book rules still require appointment-specific confirmation. [Tennessee Board](https://www.tn.gov/commerce/regboards/contractors/license/get/lle.html), [Prov bulletin, page 14](https://provexam.com/wp-content/uploads/2026/06/TNCONT_CIB-2026.06.15.pdf).
- OpenClaw's Gateway reference supports configured secret sources and distinguishes status from multi-target probing. The runbook now requires exact-target evidence. [Gateway CLI](https://docs.openclaw.ai/cli/gateway), [exec policy](https://docs.openclaw.ai/tools/exec). No macOS setup, plugin installation, authentication test, or sandbox test was executed; the pinned plugin example still needs current compatibility verification.
- CAD placement received a local arithmetic and syntax review only. The snippets remain prototypes: FreeCAD exports were not run, DXF is absent, and formal schema/path validation and engineering design are not implemented by this review.
- The living-documentation checker remains a declared-path and commit-age sample. Full tier/schema/content validation is not implemented. Its output now states that limit instead of asserting compliance.

No unresolved editorial decisions require user input. Environment-dependent validation above remains explicitly unexecuted; zero deferred files does not mean those runtime checks passed. No model/API evaluations, live workflows, purchases, account changes, commits, pushes, PRs, merges, or publication were performed.

### Supporting documentation and validation

- [Task inputs](prompts/PROJECT-INPUTS.md) and [Project inputs](openai/PROJECT-INPUTS.md) now match changed modes, defaults, clinical inputs, and capability limits. Added previously missing entries for OpenClaw, the documentation standard, outdoor gym, personal website, LLE, and trading.
- [README](README.md) is regenerated through its catalog script. [Changelog](changelog.md) records this review separately from pre-existing work. Existing tracking files need no status changes because no tracked feature was shipped.

| Check | Exit | Result |
| --- | --- | --- |
| `node .github/scripts/readme-catalog.mjs` | 0 | Regenerated catalog for 44 Markdown resources, including indexes. |
| `node .github/scripts/readme-catalog.mjs --check` | 0 | Catalog current. |
| `node --test .github/scripts/*.test.mjs` | 0 | 12 passed; 0 failed, skipped, or cancelled. |
| `node .github/scripts/check-markdown-links.mjs` | 0 | All local links resolve across 56 Markdown files. |
| `npx --yes markdownlint-cli2@0.23.2` | 1 | 10 existing issues, all in unchanged `prompt-library-review-and-improvement.md`: list spacing/numbering and final newline. Formatting issues introduced by this review were fixed. |
| `npx --yes markdownlint-cli2@0.23.2 --no-globs "**/*.md" "#prompt-library-review-and-improvement.md"` | 0 | Same lint rules, explicitly excluding only the preserved draft: 55 files, 0 issues. `--no-globs` prevents the configured inclusive glob from re-adding it. No lint configuration was changed. |
| `git diff --check` | 0 | No whitespace errors. |

Additional local checks confirmed the 41-file ledger, both input guides' coverage, 30 scenario rows, and unchanged bytes for both pre-existing untracked files. Thirty content files plus five supporting files changed. Two CAD Python blocks parsed without execution; the example JSON parsed and all 46 boxes fit the stated 2400 by 4800 mm footprint. The PowerShell checker sample passed AST parsing without execution. The AI trainer instructions contain 5,962 characters, within their 6,000-character requirement. These checks do not establish runtime behavior, structural adequacy, or model effectiveness.
