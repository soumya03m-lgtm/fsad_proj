# Enterprise Upgrade Plan

This document defines the incremental upgrade path from project MVP to enterprise-ready EdTech SaaS.

## Step 1: Architecture Upgrade (Completed)
- Backend:
  - Introduced bootstrap layer (`core/bootstrap`) to separate app wiring from module logic.
  - Introduced shared HTTP primitives (`core/http`) for consistent success/error payloads.
  - Introduced typed domain error (`AppError`) for predictable error handling.
- Frontend:
  - Introduced app shell entrypoint (`app/AppRoot.jsx`) to isolate bootstrapping.
  - Added centralized `AppErrorBoundary` and startup loader fallback.
  - Extracted design tokens into dedicated style layer (`styles/tokens.css`).

## Step 2: Database Schema Upgrade (In Progress)
- Add `Department`, `InstructorProfile`, `FeedbackWindow`, `Notification`, `ActivityLog`.
- Add role hierarchy enum: `SUPER_ADMIN`, `TEACHER`, `STUDENT`.
- Add response metadata: `submissionStatus`, `submittedWithinWindow`, `editedUntil`.
- Add analytics materialization collections:
  - `course_analytics_snapshots`
  - `instructor_analytics_snapshots`
  - `department_analytics_snapshots`

## Step 3: Backend Structure Upgrade
- Move modules toward layered pattern:
  - `controller` (transport)
  - `service` (business logic)
  - `repository` (data access)
  - `policy` (authorization and window checks)
- Add shared modules:
  - rate limiting middleware
  - sanitization middleware
  - pagination and search query parser
  - activity logger

## Step 4: Frontend Design System Upgrade
- Build reusable primitives: `KpiCard`, `DataGrid`, `FilterBar`, `MetricTrend`.
- Add normalized spacing scale and semantic color tokens.
- Add responsive dashboard shell and premium onboarding flow.

## Step 5: Advanced Analytics Logic
- Instructor performance score (weighted by response volume and recency).
- Weighted average ratings by question type weight.
- Basic sentiment analyzer and recurring keyword extractor.
- Cross-semester trend pipelines and course comparison APIs.
- Heatmap endpoints for course/instructor x metric views.

## Step 6: Premium Features Rollout
- Gamification tracker + participation badges.
- Submission reminders + notifications.
- Historical archive + leaderboard + comparative views.
- Feedback edit window and deadline lock logic.
- Department-level drill-down analytics and export improvements.
