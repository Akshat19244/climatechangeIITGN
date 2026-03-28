# MessWise Application Architecture

## Overview

MessWise is a modern, scalable React application built with Vite and TypeScript. It follows a component-based architecture with clear separation of concerns.

## Core Principles

1. **Component Composition**: Reusable, modular components
2. **Type Safety**: Full TypeScript coverage
3. **Performance**: Lazy loading, memoization, optimal renders
4. **Maintainability**: Clear folder structure and naming conventions
5. **Scalability**: Easy to add features without breaking existing code

## Architecture Diagram

```
┌─────────────────────────────────────┐
│        App.tsx (Router)             │
├─────────────────────────────────────┤
│  Pages (Dashboard, Login, etc)      │
├─────────────────────────────────────┤
│  Components (UI + Features)         │
├─────────────────────────────────────┤
│  Hooks (useAuth, useAnalytics)      │
├─────────────────────────────────────┤
│  Lib (utils, api, constants)        │
├─────────────────────────────────────┤
│  Styles (Tailwind + Design Tokens)  │
└─────────────────────────────────────┘
```

## Directory Structure & Responsibilities

### `/src/pages`
**Purpose**: Top-level route components
- `Dashboard.tsx` - Main student view (charts, wallet, impact)
- `MealPreference.tsx` - Meal planning interface
- `Analytics.tsx` - Detailed analytics & visualizations
- `AdminDashboard.tsx` - Campus overview for admins
- `Login.tsx` - Authentication page

**Key Pattern**: Pages orchestrate components and pass state/callbacks

### `/src/components/ui`
**Purpose**: Reusable UI building blocks
- `Button.tsx` - Styled button with variants
- `Input.tsx` - Form input field
- `Card.tsx` - Container component
- `Toast.tsx` - Notification system

**Characteristics**:
- Controlled by props
- No side effects
- Fully customizable
- Accessible (ARIA attributes)

### `/src/components/features`
**Purpose**: Feature-specific components
- `WalletBalance.tsx` - Credits display
- `ImpactIndicator.tsx` - Environmental metrics
- `MealPreferences.tsx` - Meal selection UI
- `WastageTracker.tsx` - Report form
- `Leaderboard.tsx` - Rankings display
- `Achievements.tsx` - Badge system

**Pattern**: Self-contained features that can be reused across pages

### `/src/components/layout`
**Purpose**: Page structure components
- `Navbar.tsx` - Top navigation
- `Footer.tsx` - Footer with links
- `Sidebar.tsx` - (Optional) Side navigation

**Responsibility**: Wrapping page content with navigation

### `/src/hooks`
**Purpose**: Custom React hooks for logic reuse

#### `useAuth.ts`
```typescript
const { user, isAuthenticated, login, logout } = useAuth()
```
- Manages authentication state
- Handles login/logout
- Persists to localStorage

#### `useAnalytics.ts`
```typescript
const { data, isLoading, error } = useAnalytics(timeRange)
```
- Fetches analytics data
- Handles loading/error states
- Caches results

**Best Practices**:
- Custom hooks for side effects
- Hooks for shared logic between components
- Hooks replace class component lifecycle

### `/src/lib`
**Purpose**: Utility functions and helpers

#### `utils.ts`
- `cn()` - Tailwind class merging (clsx + tailwind-merge)
- `formatDate()` - Date formatting
- `formatCurrency()` - Currency formatting
- `capitalize()` - String utilities

#### `api.ts`
- `apiCall<T>()` - Generic fetch wrapper
- Endpoints for: user, meals, analytics, wallet, etc.
- Token injection for auth
- Error handling

#### `constants.ts`
- `MEAL_TYPES` - ['breakfast', 'lunch', 'dinner']
- `PORTION_SIZES` - ['full', 'half', 'skip']
- `USER_ROLES` - ['student', 'admin', 'staff']
- API endpoints
- Credit/impact rules
- Badges configuration

### `/src/styles`
**Purpose**: Global styling and design system

#### `globals.css`
- Design tokens (colors, spacing)
- Global styles
- Utility classes
- Animations
- Theme definitions

## Data Flow

### State Management Strategy

```
Component Props ↓
└─ useState (Local State)
   └─ useAuth (Global Auth Context)
      └─ API Calls (fetch data)
         └─ useAnalytics (Custom Hook)
```

**Pattern: Lifting State Up**
```
┌─────────────────────┐
│   Dashboard Page    │  (State holder)
│  [prefs, selected]  │
├─────────────────────┤
│  MealPreferences    │  (Controlled component)
│  onPreferenceChange │  (Callback prop)
└─────────────────────┘
```

### Authentication Flow

```
1. User enters credentials
   ↓
2. Login.tsx → useAuth.login()
   ↓
3. apiCall('/auth/login')
   ↓
4. Token stored in localStorage
   ↓
5. User data in context
   ↓
6. Redirect to /dashboard
```

### Data Fetching Flow

```
1. Component mounts
   ↓
2. useAnalytics hook triggered
   ↓
3. API call via apiCall() function
   ↓
4. Data received → setState
   ↓
5. Component re-renders with data
   ↓
6. Charts/tables update
```

## Component Composition Example

### Dashboard Page
```tsx
Dashboard.tsx
├── Navbar (layout)
├── Section 1: Stats
│   └── Card × 4
├── Section 2: Wallet & Impact
│   ├── WalletBalance
│   └── ImpactIndicator
├── Section 3: Charts
│   ├── Card + LineChart
│   └── Card + BarChart
├── Section 4: Meal Prefs & Actions
│   ├── MealPreferences
│   └── Quick Action Card
└── Footer (layout)
```

## Styling Architecture

### Design Tokens (CSS Variables)
```css
:root {
  --primary: 217 100% 45%;      /* HSL format */
  --secondary: 180 100% 40%;
  --background: 0 0% 98%;
  /* ... */
}
```

### Tailwind Integration
```tsx
<div className="bg-primary text-primary-foreground">
  /* Uses --primary token */
</div>
```

### Component Styles
```tsx
const Button = ({ variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    /* ... */
  }
  return <button className={variants[variant]} />
}
```

## Performance Optimizations

### 1. Code Splitting
- Routes lazy loaded (React.lazy)
- Components split by feature

### 2. Memoization
```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Only re-renders if props change
})
```

### 3. Hook Optimization
```tsx
const handleChange = useCallback(() => {
  // Function identity stable
}, [dependency])
```

### 4. Chart Performance
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}> {/* Only re-renders if data changes */}
```

## Error Handling

### API Errors
```ts
try {
  const data = await apiCall('/endpoint')
} catch (error) {
  // ApiError type with message, status, data
  showToast(error.message, 'error')
}
```

### Component Errors
```tsx
// Boundary pattern (future enhancement)
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
```

## Testing Strategy

### Components
```tsx
// Component props tested
<Button variant="primary" onClick={...} />
```

### Hooks
```tsx
// Hook behavior tested
const { data, isLoading } = useAnalytics('week')
// Assertions on state updates
```

### Pages
```tsx
// Page integration tested
<Dashboard /> // With mocked auth/api
```

## Scalability Considerations

### Adding New Features
1. Create feature component in `/components/features`
2. Use existing hooks or create new ones
3. Integrate into page
4. Add routes if needed

### Adding New Pages
1. Create page in `/src/pages`
2. Add route in `App.tsx`
3. Add navigation link in `Navbar.tsx`

### Adding New API Endpoints
1. Add function in `src/lib/api.ts`
2. Create hook if used across components
3. Use in components/pages

## Security Considerations

### Current Implementation (Development)
- Mock authentication
- Tokens stored in localStorage
- No CORS handling

### Production Checklist
- [ ] Implement real JWT validation
- [ ] Use httpOnly cookies for tokens
- [ ] HTTPS only
- [ ] CSRF protection
- [ ] Input validation with Zod
- [ ] Rate limiting
- [ ] SQL injection prevention

## Backend Integration Guide

### API Contract Example
```ts
// Student meals preferences endpoint
GET /api/meals/preferences?date=2024-03-28

Response:
{
  "success": true,
  "data": [
    {
      "mealType": "breakfast",
      "attending": true,
      "portion": "full"
    }
  ]
}
```

### Updating apiCall()
```ts
// In src/lib/api.ts
export async function getMealPreferences(date: string) {
  return apiCall(`/meals/preferences?date=${date}`)
}
```

### Using in Component
```tsx
const { data } = useQuery(
  ['meals', date],
  () => getMealPreferences(date)
)
```

## Deployment Architecture

### Build Process
```
src/
  └─ TypeScript compilation
  └─ Tailwind CSS processing
  └─ Asset bundling (Vite)
     └─ dist/
        ├─ index.html
        ├─ js/
        └─ assets/
```

### Environment-Specific Config
```
.env.production  (API_URL=prod)
.env.development (API_URL=localhost:3000)
.env.local       (personal overrides)
```

## Future Architecture Improvements

1. **State Management**: Implement Context API or Redux for complex state
2. **API Caching**: Add TanStack Query (React Query) for data management
3. **Error Boundaries**: Component-level error handling
4. **Monitoring**: Sentry integration for error tracking
5. **Analytics**: Event tracking for user behavior
6. **Testing**: Unit/integration/E2E test suite
7. **CI/CD**: GitHub Actions for automated testing/deployment

## Component Dependency Graph

```
App.tsx
├── Login (no dependencies)
└── Dashboard
    ├── Navbar (useAuth)
    ├── Stats (useAnalytics)
    ├── WalletBalance (props)
    ├── ImpactIndicator (props)
    ├── Analytics Chart (useAnalytics)
    ├── MealPreferences (useState)
    └── Footer (no dependencies)
```

## Naming Conventions

### Files
- Components: PascalCase (Dashboard.tsx)
- Utilities: camelCase (utils.ts)
- Styles: kebab-case (globals.css)

### Exports
- Named exports for utility functions
- Default export for components

### Props Interfaces
- ComponentNameProps pattern
- Clear prop documentation

## Summary

MessWise follows modern React best practices:
- **Component-driven** architecture
- **Hooks-based** state management
- **Type-safe** with TypeScript
- **Performant** with memoization & code splitting
- **Scalable** with clear separation of concerns
- **Maintainable** with consistent patterns

The architecture supports easy feature additions and backend integration while maintaining code quality and performance.
