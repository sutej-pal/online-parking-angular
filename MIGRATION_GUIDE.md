# Migration Guide: Angular to Next.js

This document outlines the migration from Angular to Next.js for the Online Parking application.

## Overview

The application has been migrated from Angular 15 to Next.js 14 with the App Router. The three portals (Client, Business, Admin) are now organized as route groups in the Next.js application.

## Key Changes

### 1. Project Structure

**Before (Angular):**
```
projects/
  ├── client-portal/
  ├── business-portal/
  └── admin-portal/
```

**After (Next.js):**
```
app/
  ├── client/
  ├── business/
  └── admin/
shared/
  ├── services/
  ├── store/
  ├── hooks/
  └── types/
```

### 2. State Management

**Before:** NgRx Store
**After:** Zustand

- NgRx reducers and actions have been converted to Zustand stores
- State persistence is handled by Zustand's persist middleware
- Examples: `individualStore.ts`, `searchStore.ts`

### 3. Routing

**Before:** Angular Router with route modules
**After:** Next.js App Router with file-based routing

- Routes are now defined by the file structure in the `app/` directory
- Route guards are implemented using Next.js middleware
- Example: `/client/home` → `app/client/home/page.tsx`

### 4. Components

**Before:** Angular Components (.component.ts, .component.html, .component.scss)
**After:** React Components (.tsx)

- Angular components converted to React functional components
- Template syntax converted to JSX
- Lifecycle hooks converted to React hooks (useEffect, useState, etc.)

### 5. Services

**Before:** Angular Injectable Services
**After:** Plain TypeScript classes/modules

- Services are now plain TypeScript classes
- HTTP service uses Axios instead of Angular HttpClient
- Interceptors converted to Axios interceptors

### 6. Forms

**Before:** Angular Reactive Forms
**After:** React Hook Form

- FormGroup/FormControl replaced with useForm hook
- Validators converted to React Hook Form validation rules

### 7. UI Library

**Before:** Angular Material
**After:** Material-UI (MUI)

- Angular Material components replaced with MUI equivalents
- Similar API but React-based

### 8. HTTP Client

**Before:** Angular HttpClient with RxJS Observables
**After:** Axios with Promises

- All HTTP calls converted from Observables to Promises
- `.toPromise()` calls removed, using async/await directly

## Migration Checklist

### Completed ✅
- [x] Next.js project setup
- [x] TypeScript configuration
- [x] Shared services (HTTP, Auth, Notifications)
- [x] State management setup (Zustand)
- [x] Client portal structure
- [x] Business portal structure
- [x] Admin portal structure
- [x] Authentication middleware
- [x] Basic routing for all portals
- [x] Login pages for all portals
- [x] Header component (Client portal)
- [x] SearchBar component (Client portal)

### In Progress / TODO
- [ ] Complete all client portal pages
- [ ] Complete all business portal pages
- [ ] Complete all admin portal pages
- [ ] Google Maps integration
- [ ] Google OAuth integration
- [ ] Socket.io integration
- [ ] All remaining components
- [ ] Styling and SCSS migration
- [ ] Testing
- [ ] Environment configuration

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

3. Run development server:
```bash
npm run dev
```

4. Access portals:
- Client: http://localhost:3000/client
- Business: http://localhost:3000/business
- Admin: http://localhost:3000/admin

## Key Files to Review

- `shared/services/http.service.ts` - HTTP client
- `shared/services/auth.service.ts` - Authentication utilities
- `shared/store/` - State management stores
- `middleware.ts` - Route protection
- `app/client/components/` - Client portal components
- `app/business/` - Business portal pages
- `app/admin/` - Admin portal pages

## Notes

- The migration maintains the same API structure and endpoints
- Authentication tokens are stored in localStorage (same as before)
- Some components may need additional styling to match the original design
- Google Maps integration needs API key configuration
- Socket.io integration needs to be implemented for real-time features

## Next Steps

1. Complete migration of all remaining components
2. Add proper error handling and loading states
3. Implement missing features (Google OAuth, Socket.io)
4. Add comprehensive styling
5. Write tests
6. Deploy and test in production environment

