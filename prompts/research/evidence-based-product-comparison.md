# Evidence-Based Product Comparison

Use this prompt to compare products or services against the buyer's actual
requirements using current specifications, pricing, ownership costs, and clear
evidence.

## Prompt

Compare these options:

- Products or services: `[INSERT OPTIONS OR ASK FOR CANDIDATES]`
- Intended use: `[INSERT USE]`
- Required features: `[INSERT REQUIREMENTS]`
- Nice-to-have features: `[INSERT PREFERENCES]`
- Budget and currency: `[INSERT BUDGET]`
- Location and market: `[INSERT LOCATION]`
- Purchase deadline: `[INSERT DATE OR NONE]`
- Existing equipment or ecosystem: `[INSERT DETAILS OR NONE]`
- Physical, medical, accessibility, installation, or compatibility constraints: `[INSERT CONSTRAINTS]`
- New, used, rental, or subscription acceptable: `[INSERT OPTIONS]`

Do not recommend a product until the requirements and disqualifying constraints
are clear. Ask only for missing information that would materially change the
decision.

### 1. Define the decision criteria

Convert the user's needs into weighted criteria such as:

- fitness for the primary use;
- compatibility and installation;
- performance and measurable capacity;
- safety and required certifications;
- durability, repairability, and warranty;
- privacy, data ownership, and subscription dependence;
- portability, size, weight, noise, or power use;
- purchase price and total cost of ownership;
- availability, support, and return policy.

Mark requirements as mandatory, preferred, or irrelevant. Do not give weight to
features the user will not use.

### 2. Research current facts

Use current primary sources:

- manufacturer specifications and manuals;
- official compatibility tools;
- regulatory or certification databases;
- current retailer or service pricing when needed;
- warranty and subscription terms;
- independent standardized testing when primary sources cannot establish
  real-world performance.

Record access date, model or generation, region, and price conditions. Do not
mix specifications from different revisions or markets.

Separate verified facts from reasonable inference and user reports. Treat
affiliate rankings and marketing claims as weak evidence.

### 3. Check hard compatibility first

Eliminate or flag options that fail a mandatory condition such as:

- dimensions, fit, connector, voltage, network bands, platform, or protocol;
- supported operating system or device;
- required load, temperature, weather, or duty rating;
- medication storage, medical use, or other regulated constraints;
- installation limits, property restrictions, or local availability;
- required privacy or offline behavior.

Do not average a disqualifying failure into a high overall score.

### 4. Calculate ownership cost

Include applicable costs:

- base product and required accessories;
- shipping, taxes, installation, permits, or professional labor;
- subscriptions and cloud features;
- consumables, batteries, filters, storage, or data plans;
- maintenance and expected replacement;
- warranty extensions;
- switching or ecosystem costs.

Show the comparison period and assumptions. Do not present a temporary sale as
a stable price.

### 5. Compare evidence in a decision table

For each option, show:

- exact model;
- mandatory requirement result;
- important specifications;
- strengths for the stated use;
- material limitations;
- privacy or subscription concerns;
- current price and total-cost estimate;
- warranty and support;
- evidence confidence.

Use `Unknown` when a fact cannot be verified.

### 6. Make a practical recommendation

Recommend:

- best overall fit;
- best lower-cost alternative;
- best option for a different major priority when relevant;
- options to avoid and why;
- what the user should verify before purchase.

Explain which requirement drove the decision. Do not claim medical, financial,
structural, or safety suitability beyond available evidence; identify when a
qualified professional or official compatibility confirmation is required.

### 7. Check purchase timing and uncertainty

Flag:

- announced replacements;
- short return windows;
- region-locked features;
- uncertain inventory;
- subscription or pricing changes;
- missing long-term reliability evidence;
- used-market risks and warranty transfer limits.

### Completion report

Provide:

- requirements and weights;
- disqualified options;
- evidence-backed comparison table;
- current price and total-cost assumptions;
- recommendation and alternatives;
- uncertainties and pre-purchase checks;
- direct source links near the claims they support.
