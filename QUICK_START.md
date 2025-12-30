# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Create .env.local file in the root directory
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3105/api/
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Client Portal: http://localhost:3000/client
   - Business Portal: http://localhost:3000/business
   - Admin Portal: http://localhost:3000/admin

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── client/            # Client portal pages
│   ├── business/          # Business portal pages
│   ├── admin/             # Admin portal pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page (redirects to /client)
├── shared/                 # Shared utilities
│   ├── services/          # HTTP, Auth, Notification services
│   ├── store/             # Zustand state stores
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript type definitions
├── middleware.ts          # Next.js middleware for route protection
└── package.json           # Dependencies
```

## Key Features Migrated

✅ **Client Portal:**
- Home page with search bar
- Login/Sign up pages
- Search functionality
- Forgot password
- Header component with user menu

✅ **Business Portal:**
- Login page
- Home page (protected route)

✅ **Admin Portal:**
- Login page
- Home page (protected route)

✅ **Shared Services:**
- HTTP client with interceptors
- Authentication service
- Notification service
- State management (Zustand)

## Next Steps

1. Complete remaining pages and components
2. Add Google Maps integration
3. Implement Google OAuth
4. Add Socket.io for real-time features
5. Complete styling and theming
6. Add error boundaries and loading states
7. Write tests

## Development Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run dev:client` - Start client portal (port 5100)
- `npm run dev:business` - Start business portal (port 5200)
- `npm run dev:admin` - Start admin portal (port 5300)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

**Issue: Module not found errors**
- Run `npm install` to ensure all dependencies are installed

**Issue: Google Maps not loading**
- Check that `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in `.env.local`
- Ensure the API key has Places API enabled

**Issue: API calls failing**
- Verify `NEXT_PUBLIC_API_BASE_URL` is correct in `.env.local`
- Check that the backend API is running

