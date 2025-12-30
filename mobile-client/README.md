# Online Parking - Mobile Client App

React Native mobile application for the Online Parking client portal, built with Expo.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on specific platform:
```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

## Project Structure

```
mobile-client/
├── app/                 # Expo Router pages
│   ├── (tabs)/         # Tab navigation screens
│   ├── _layout.tsx     # Root layout
│   ├── login.tsx       # Login screen
│   └── ...
├── components/          # Reusable components
│   ├── ui/             # UI components (Button, Input, etc.)
│   └── SearchBar.tsx   # Search bar component
├── services/            # API services
│   ├── http.service.ts
│   ├── auth.service.ts
│   └── notification.service.ts
├── store/              # Zustand state management
│   ├── individualStore.ts
│   └── searchStore.ts
└── types/              # TypeScript types
```

## Environment Variables

Create a `.env` file in the root directory:

```
EXPO_PUBLIC_API_BASE_URL=http://localhost:3105/api/
```

## Features

- 🔐 Authentication (Login, Sign Up, Forgot Password)
- 🔍 Parking lot search
- 📍 Location services
- 💾 State persistence with Zustand
- 🎨 Modern UI with React Native components

## Development

- Uses Expo Router for file-based routing
- Zustand for state management
- React Hook Form for form handling
- AsyncStorage for local data persistence

## Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## Notes

- The app shares types and some logic with the Next.js web app through the `shared` folder
- Location services require appropriate permissions
- API endpoints should match the Next.js backend configuration

