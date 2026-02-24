# Student Feedback and Evaluation System - System Architecture (Step 1)

## 1) Product Goals

- Build a SaaS-style, production-ready feedback platform (not a CRUD demo).
- Support two core roles: `ADMIN` (teacher/institution) and `STUDENT`.
- Ensure anonymous student feedback while still enforcing access control.
- Provide actionable analytics from aggregated responses.

## 2) High-Level Architecture

### Frontend
- React + Vite SPA
- Tailwind CSS design system
- React Router for route-level separation
- Context API for auth, theme, and UI state
- React Hook Form for dynamic form workflows
- Recharts for analytics visualizations
- Framer Motion for page and component transitions

### Backend
- Node.js + Express REST API
- MongoDB (Mongoose ODM)
- JWT-based authentication
- Role-based authorization middleware
- Aggregation pipelines for analytics

### Runtime Flow
1. User authenticates (`/auth/login`) and receives access token.
2. Frontend stores token securely in memory + refresh strategy (httpOnly cookie preferred for refresh token).
3. Protected API routes validate JWT and enforce role access.
4. Students submit responses mapped to form/question IDs.
5. Admin dashboard consumes analytics endpoints built from MongoDB aggregation.

## 3) Monorepo Folder Structure

```txt
fsad_proj/
  frontend/
    public/
    src/
      app/
        router/
          index.jsx
          ProtectedRoute.jsx
          RoleGate.jsx
        providers/
          AppProviders.jsx
      assets/
      components/
        ui/
          Button.jsx
          Input.jsx
          Select.jsx
          Textarea.jsx
          Card.jsx
          Modal.jsx
          Badge.jsx
          Skeleton.jsx
          Tabs.jsx
          Dropdown.jsx
          Toast.jsx
          Switch.jsx
        charts/
          StatsCard.jsx
          SatisfactionPieChart.jsx
          RatingBarChart.jsx
          TrendLineChart.jsx
        feedback/
          QuestionRenderer.jsx
          QuestionEditor.jsx
          FormBuilderCanvas.jsx
          FormPreview.jsx
          LikertScaleInput.jsx
          EmojiRatingInput.jsx
        layout/
          Sidebar.jsx
          Topbar.jsx
          Breadcrumbs.jsx
          PageContainer.jsx
          ProfileMenu.jsx
      context/
        AuthContext.jsx
        ThemeContext.jsx
        ToastContext.jsx
      hooks/
        useAuth.js
        useTheme.js
        useToast.js
        useDebounce.js
      layouts/
        AuthLayout.jsx
        DashboardLayout.jsx
      pages/
        auth/
          LoginPage.jsx
          RegisterPage.jsx
        admin/
          AdminOverviewPage.jsx
          FormBuilderPage.jsx
          FormsListPage.jsx
          FormResponsesPage.jsx
          AnalyticsPage.jsx
          ReportExportPage.jsx
        student/
          StudentOverviewPage.jsx
          CourseListPage.jsx
          SubmitFeedbackPage.jsx
          InsightsPage.jsx
        common/
          NotFoundPage.jsx
          UnauthorizedPage.jsx
      services/
        apiClient.js
        authService.js
        courseService.js
        formService.js
        responseService.js
        analyticsService.js
      utils/
        constants.js
        formatters.js
        validators.js
      styles/
        tailwind.css
      main.jsx
  backend/
    src/
      config/
        env.js
        db.js
      modules/
        auth/
          auth.controller.js
          auth.service.js
          auth.routes.js
          auth.validation.js
        users/
          user.model.js
          user.controller.js
          user.service.js
          user.routes.js
        courses/
          course.model.js
          course.controller.js
          course.service.js
          course.routes.js
        feedbackForms/
          feedbackForm.model.js
          feedbackForm.controller.js
          feedbackForm.service.js
          feedbackForm.routes.js
        feedbackResponses/
          feedbackResponse.model.js
          feedbackResponse.controller.js
          feedbackResponse.service.js
          feedbackResponse.routes.js
        analytics/
          analytics.controller.js
          analytics.service.js
          analytics.routes.js
      middleware/
        auth.middleware.js
        role.middleware.js
        error.middleware.js
        validate.middleware.js
      shared/
        enums/
          roles.js
          questionTypes.js
        utils/
          jwt.js
          pagination.js
          logger.js
      app.js
      server.js
    tests/
      integration/
      unit/
```

## 4) Frontend Component Hierarchy

### App Shell
- `AppProviders`
- `Router`
  - `AuthLayout` for login/register
  - `DashboardLayout`
    - `Sidebar` (collapsible, role-aware nav)
    - `Topbar` (search, notifications, profile dropdown, dark mode toggle)
    - `Breadcrumbs`
    - page outlet with animated transitions

### Admin Feature Tree
- `AdminOverviewPage`
  - `StatsCard[]`
  - `SatisfactionPieChart`
  - `RatingBarChart`
  - `TrendLineChart`
- `FormBuilderPage`
  - `FormBuilderCanvas`
  - `QuestionEditor`
  - `FormPreview`
- `AnalyticsPage`
  - filters (`course`, `semester`, `date range`)
  - chart panels + response tables

### Student Feature Tree
- `CourseListPage`
  - assigned courses cards
- `SubmitFeedbackPage`
  - dynamic `QuestionRenderer` by question type
- `InsightsPage`
  - anonymized aggregated charts unlocked after submission

## 5) Database Schema Design (MongoDB)

### `users`
- `_id`
- `name`
- `email` (unique, indexed)
- `passwordHash`
- `role` (`ADMIN` | `STUDENT`)
- `isActive`
- `createdAt`, `updatedAt`

### `courses`
- `_id`
- `code` (indexed)
- `title`
- `semester` (indexed)
- `department`
- `adminId` (ref `users`)
- `assignedStudentIds` (array of ref `users`)
- `createdAt`, `updatedAt`

### `feedbackForms`
- `_id`
- `title`
- `description`
- `courseId` (ref `courses`, indexed)
- `createdBy` (ref `users`)
- `status` (`DRAFT` | `PUBLISHED` | `CLOSED`)
- `isAnonymous` (default true)
- `questions`: array
  - `questionId` (uuid-like string)
  - `label`
  - `type` (`MCQ` | `RATING` | `TEXT` | `EMOJI` | `LIKERT`)
  - `required` (boolean)
  - `options` (for MCQ / Likert)
  - `scale` (for rating range, emoji range)
- `publishAt`, `closeAt`
- `createdAt`, `updatedAt`

### `feedbackResponses`
- `_id`
- `formId` (ref `feedbackForms`, indexed)
- `courseId` (ref `courses`, indexed)
- `studentId` (ref `users`, indexed, never exposed to admin UI)
- `answers`: array
  - `questionId`
  - `value` (mixed: string/number/array)
- `submittedAt`

Unique index recommendation:
- `(formId, studentId)` unique to prevent duplicate submissions.

### `analyticsSnapshots` (optional cache)
- `_id`
- `formId`
- `courseId`
- `computedAt`
- `metrics` (pre-aggregated distributions, averages, trends)

## 6) API Structure (REST v1)

Base prefix: `/api/v1`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

### Courses
- `GET /courses` (role-aware result)
- `POST /courses` (admin)
- `PATCH /courses/:id` (admin owner)
- `DELETE /courses/:id` (admin owner)
- `POST /courses/:id/assign-students` (admin)

### Feedback Forms
- `POST /forms` (admin)
- `GET /forms` (admin: own forms, student: assigned published forms)
- `GET /forms/:id`
- `PATCH /forms/:id` (admin owner, draft/managed updates)
- `POST /forms/:id/publish` (admin)
- `POST /forms/:id/close` (admin)

### Feedback Responses
- `POST /responses/forms/:formId` (student)
- `GET /responses/forms/:formId` (admin, aggregated-safe view)
- `GET /responses/me` (student own submission states)

### Analytics
- `GET /analytics/overview?courseId=&semester=`
- `GET /analytics/forms/:formId/summary`
- `GET /analytics/forms/:formId/trends?from=&to=`
- `GET /analytics/forms/:formId/export.csv` (optional)
- `GET /analytics/forms/:formId/export.pdf` (optional)

## 7) Authorization Model

- JWT payload: `sub`, `role`, `tokenVersion`.
- Middleware chain:
  - `authMiddleware` validates token and attaches `req.user`.
  - `roleMiddleware(...allowedRoles)` guards endpoint access.
  - ownership checks in service layer (`course.adminId === req.user.id`).

## 8) Anonymous Feedback Strategy

- Store `studentId` internally for one-response enforcement and completion tracking.
- Never expose raw `studentId` in admin response APIs.
- For small cohorts, enforce minimum aggregation threshold (example: `n >= 5`) before showing breakdown to avoid re-identification.

## 9) UI/UX Design System (SaaS style)

### Visual Tokens
- `Primary`: blue family for actions and highlights
- `Secondary`: slate/neutral for structure
- `Accent`: teal/amber for positive alerts and insights
- `Radius`: `1rem` to `1.25rem` (`rounded-2xl`)
- `Shadow`: soft layered shadows for cards/modals

### Typography
- `Display`: dashboards/headings
- `Body`: readable UI text
- clear hierarchy: H1/H2/H3, body, caption, overline

### Reusable Patterns
- composable cards with header/body/footer slots
- form primitives with labels, helper text, error states
- loading skeleton states for list/cards/charts
- toast system for success/error/info
- empty states with clear call-to-action

## 10) Scalability and Maintainability Rules

- Module-based backend organization (`controller/service/routes/model`).
- Shared validation schemas (Zod/Joi) for request integrity.
- Consistent API envelope:
  - success: `{ success: true, data, meta }`
  - error: `{ success: false, error: { code, message, details } }`
- Use pagination, filtering, and indexing from first implementation.
- Keep chart transformation logic in backend service layer, not scattered in UI.

## 11) Delivery Plan After Step 1

1. Step 2: scaffold frontend and backend folders with base files.
2. Step 3: implement auth + protected routes + role gates end-to-end.
3. Step 4: ship admin dashboard shell + form builder + analytics charts.
4. Step 5: ship student flow for assigned courses, submission, and insights.
5. Step 6: finalize analytics aggregation/export and harden middleware.
6. Step 7: add testing, polish UI interactions, and portfolio documentation.
