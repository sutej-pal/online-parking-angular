# Online Parking - Next.js

This is a Next.js migration of the online parking Angular application.

## Project Structure

The application consists of three portals:
- **Client Portal** (`/client/*`) - Public-facing portal for customers
- **Business Portal** (`/business/*`) - For business owners to manage parking lots
- **Admin Portal** (`/admin/*`) - Administrative dashboard

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Or run specific portals:
```bash
npm run dev:client    # Client portal on port 5100
npm run dev:business  # Business portal on port 5200
npm run dev:admin     # Admin portal on port 5300
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3105/api/
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand / Redux Toolkit
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Maps**: Google Maps JavaScript API
- **Styling**: SCSS / CSS Modules
