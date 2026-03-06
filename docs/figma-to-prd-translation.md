# Figma → PRD Translation (Actionable)

## Goal
Translate extracted Figma context into implementation-ready PRD slices, app logic modules, immediate architecture updates, and final polish tasks.

## PRD Steps (immediate)
1. **Problem + outcomes**
   - Users need low-friction family meal planning with personalization and grocery conversion.
   - Success metrics: weekly plan completion, meal-log adherence, recommendation CTR, coupon redemption.

2. **Personas + jobs-to-be-done**
   - Household planner parent/caregiver
   - Returning user optimizing time + nutrition constraints

3. **MVP scope**
   - Onboarding/profile
   - Discover/recommend
   - Planning + shopping list conversion
   - Tracking/reflection

4. **Acceptance criteria per module**
   - Profile settings must constrain recommendations.
   - Meal cards must show prep time, servings, and macro snapshot.
   - Shopping list must aggregate ingredients + quantity + estimated cost.

5. **Analytics spec**
   - Events: profile_saved, recommendation_viewed, recommendation_saved, meal_logged, coupon_redeemed.

## App Logic Modules
- `identity`: auth/session + household context
- `profile`: restrictions/allergies/goals/member attributes
- `recommendations`: rank, explainability, safety filters
- `planning`: weekly slots, meal assignment, completion state
- `shopping`: ingredient aggregation, cost rollups, redemption links
- `tracking`: daily logs, macro summaries, adherence score

## Immediate Architecture Changes Needed
1. **Persisted data layer**
   - Move from in-memory stores to Postgres + ORM (Drizzle preferred by DSB catalog).
2. **Service boundaries**
   - Extract recommendation scoring into server module/API service.
3. **Contracts package**
   - Create shared DTO/schema package for web and future mobile clients.
4. **Role/context model**
   - Distinguish household-level vs member-level settings.
5. **Observability baseline**
   - Add event instrumentation and minimal error telemetry.

## Final Polish Steps
- Align logo, typography, and color tokens to final branding source-of-truth.
- Standardize card/chip/button variants into a design-system layer.
- Add empty/loading/error states across all core routes.
- Improve discover/tracking visual hierarchy with premium chart components (lightweight).
- Add accessibility pass (contrast, focus states, tap targets, ARIA labels).

## Blockers / Gaps
- Page 2 board extraction blocked by MCP student-seat call limits.
- Brand and component details remain partially inferred until full board exports or upgraded MCP access are provided.

## Next Operator Action
- Once board exports are available, run a “Brand Fidelity Pass” ticket to replace inferred tokens/assets with exact Figma values.
