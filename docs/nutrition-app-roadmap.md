# Alere Nutrition App Expansion Plan (Premium)

## Objective
Evolve the current premium webapp scaffold into a credible, production-ready nutrition product that can pivot to mobile with minimal rewrite.

## Product Vision
Alere should help users: discover better meals, personalize intake around restrictions/goals, redeem meaningful offers, and build long-term healthy habits through feedback loops.

## Phase 1 — Core Nutrition MVP (4–6 weeks)
### 1) Identity + Nutrition Profile
- Auth (email/social)
- Onboarding profile: age, weight, height, activity level
- Dietary model: allergies, intolerances, religion/culture, disliked ingredients
- Goal model: lose weight / maintain / gain muscle / improve energy

### 2) Meal Discovery + Recommendation Engine v1
- Search + filters by diet/restriction/macros
- Recommendation ranking inputs:
  - profile constraints
  - recent behavior
  - goal alignment
- Explainability UI: “why this is recommended” chip

### 3) Meal Logging + Progress Basics
- Quick log: breakfast/lunch/dinner/snack
- Manual macro estimate fields + serving size
- Daily dashboard: calories, protein/carbs/fat, hydration, adherence score

### 4) Coupon + Store Utility (existing differentiator)
- Coupon wallet with claim/redeem states
- QR generation + redemption audit trail
- Store inventory-awareness flag (basic)

### 5) Developer Foundations (for mobile pivot)
- Domain modules: identity, nutrition, recommendations, offers, stores
- Typed API contracts (DTOs) + OpenAPI/JSON schema
- Shared design tokens and component contracts

## Phase 2 — Product-Market Fit Features (4–8 weeks)
### 1) Smart Logging Improvements
- Barcode scan (packaged foods)
- Photo-assisted meal logging (human review / AI later)
- Favorite meals + one-tap repeat

### 2) Coaching Loop
- Weekly check-ins
- Goal recalibration logic
- Habit nudges based on missed targets

### 3) Personalization v2
- Collaborative + content-based recommendation hybrid
- “What changed this week” recommendation updates
- Better cold-start logic for new users

### 4) Merchant/Partner Layer
- Merchant dashboard for coupon campaigns
- Redemption analytics (CTR, claim-to-redeem rate)

## Phase 3 — Premium Differentiators (6–12 weeks)
### 1) Care Team / Coach Features
- Coach notes
- Plan assignments
- Accountability streaks

### 2) Health Integrations
- Apple Health / Google Fit ingestion
- Wearable activity + sleep influence on recommendations

### 3) Advanced Outcomes
- Nutrition quality score trends
- Cohort-level behavior insights for growth team

## Mobile Pivot Strategy (start now)
- Keep frontend feature routes aligned to future mobile tabs/screens.
- Treat web as client to a versioned API; avoid web-only business logic.
- Move recommendation and nutrition calculations to backend services.
- Use a shared schema package (`@alere/contracts`) consumed by web/mobile/backend.

## Data Model Priorities (minimum)
- User
- NutritionProfile
- Restriction
- Goal
- MealEntry
- Recommendation
- Coupon
- Redemption
- Store

## Success Metrics
- D7 retention
- Weekly active users
- Meal log completion rate
- Recommendation click-through + save rate
- Coupon claim → redemption rate
- Goal adherence trend

## Execution Ticketing (suggested next 3 tickets)
1. Build onboarding/profile + auth + schema foundation
2. Build recommendation-ready meal discovery + filters + explainability chips
3. Build daily tracking dashboard + meal logging flow + progress summaries

## Scope Estimate (planning only)
- Effort: 3–5 months for polished v1+v2 with small team
- Token footprint for implementation lifecycle: high (requires split tickets; do not run as one giant build)
- Model tier: Tier 1 reasoning for architecture decisions; Tier 2 for implementation tickets
