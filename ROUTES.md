# Routes Documentation

This document provides a comprehensive overview of all routes in the TodoApp frontend application.

## Technology Stack
- **Framework**: React 18.3.1
- **Router**: React Router DOM v6.28.0
- **Build Tool**: Vite 5.4.10
- **Language**: TypeScript 5.6.2

## Route Structure

The application uses React Router v6's `createBrowserRouter` to define routes. All routes are configured in `src/routes/routes.tsx`.

## Available Routes

### 1. Landing Page Route (`/`)

**Path**: `/`  
**Component**: `LandingRoot` → `HomePage`  
**File Location**: 
- Root: `src/routes/landing/root.tsx`
- Page: `src/routes/landing/home/page.tsx`

**Description**: 
The landing page is the entry point of the application. It displays a welcome message and authentication options for users.

**Features**:
- Sign In form
- Create Account form
- Tabbed interface for switching between sign-in and account creation
- Automatic redirect to `/dashboard` if user is already logged in

**Access Control**:
- Public route (accessible to non-authenticated users)
- Redirects authenticated users to dashboard

**Components Used**:
- `Navbar`: Navigation bar for landing page
- `SignInCard`: Sign-in form component
- `CreateAccountCard`: Account creation form component

---

### 2. Dashboard Route (`/dashboard`)

**Path**: `/dashboard`  
**Component**: `DashboardRoot` → `DashboardHomePage`  
**File Location**: 
- Root: `src/routes/dashboard/root.tsx`
- Page: `src/routes/dashboard/page.tsx`

**Description**: 
The dashboard is the main application interface where authenticated users can manage their tasks and tags.

**Features**:
- Display available tags
- Task management interface
- Create, edit, delete, and view tasks
- Task status management
- Tag-based organization

**Access Control**:
- Protected route (requires authentication)
- Redirects unauthenticated users to landing page (`/`)

**Components Used**:
- `Navbar`: Navigation bar for dashboard
- `TagsSection`: Displays and manages tags
- `TasksSection`: Displays and manages tasks
- Various task-related components:
  - `CreateDialog` / `CreateForm`: Create new tasks
  - `EditDialog` / `EditForm`: Edit existing tasks
  - `DeleteDialog`: Delete tasks
  - `ShowDialog`: View task details
  - `StatusBadge`: Display task status
  - `EmptyState`: Empty state when no tasks exist
  - `Card`: Task card component

---

## Route Hierarchy

```
/
├── / (Landing)
│   └── index → HomePage
│       ├── Sign In Tab
│       └── Create Account Tab
│
└── /dashboard (Dashboard)
    └── index → DashboardHomePage
        ├── Tags Section
        └── Tasks Section
```

## Navigation Flow

```
User Flow:
1. User visits "/" (Landing Page)
   ├─ If not logged in → Shows Sign In/Create Account options
   └─ If logged in → Automatically redirects to "/dashboard"

2. User at "/dashboard"
   ├─ If logged in → Shows Dashboard with tasks and tags
   └─ If not logged in → Automatically redirects to "/"
```

## Route Guards

Both routes implement authentication guards:

1. **Landing Route** (`/`):
   - Checks `isLoggedIn` state from `useAuthStore`
   - If user is logged in: `<Navigate to="/dashboard" />`

2. **Dashboard Route** (`/dashboard`):
   - Checks `isLoggedIn` state from `useAuthStore`
   - If user is not logged in: `<Navigate to="/" />`

## Future Route Expansion

The current route structure uses nested routing with `Outlet` components, making it easy to add new child routes:

### Potential Landing Routes:
- `/about` - About page
- `/features` - Features page
- `/pricing` - Pricing information
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Potential Dashboard Routes:
- `/dashboard/profile` - User profile page
- `/dashboard/settings` - User settings
- `/dashboard/tags` - Dedicated tags management page
- `/dashboard/tasks/:id` - Individual task details page
- `/dashboard/search` - Search functionality
- `/dashboard/archive` - Archived tasks

## Common UI Components

Both routes share common UI patterns:
- **Navbar**: Displays at the top of each section
- **Toaster**: Notification system (using Sonner library)
- **SEO Hook**: Dynamic page titles using `useSEO` hook

## Styling

- **CSS Framework**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Custom Styling**: Custom utility classes with `cs-section` and `cs-container`

## State Management

- **Auth State**: Managed by Zustand (`useAuthStore`)
- **Server State**: Managed by TanStack Query (React Query)

---

## Developer Notes

### Adding a New Route

To add a new route to the application:

1. Create the route structure in `src/routes/`
2. Create root component (if needed) with layout
3. Create page component with the main content
4. Update `src/routes/routes.tsx` to include the new route
5. Add appropriate authentication guards if needed

Example:
```tsx
{
  path: "/new-route",
  element: <NewRouteRoot />,
  children: [
    { index: true, element: <NewRoutePage /> },
    { path: "sub-route", element: <SubRoutePage /> }
  ]
}
```

### Route Configuration

All routes are configured in a centralized location: `src/routes/routes.tsx`

This makes it easy to:
- See all available routes at a glance
- Understand the application structure
- Add or modify routes in one place
- Maintain consistent routing patterns
