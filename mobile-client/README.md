# Online Parking - Mobile Client App

React Native mobile application for the Online Parking client portal, built with Expo.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- For iOS development: Xcode (Mac only)
- For Android development: Android Studio with Android SDK

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
npm run ios      # iOS Simulator (Mac only)
npm run android  # Android Emulator (requires Android Studio)
npm run web      # Web browser
```

## Android Setup (Windows)

If you want to run the Android app, you need to:

1. **Install Android Studio:**
   - Download from https://developer.android.com/studio
   - Install Android SDK, Android SDK Platform, and Android Virtual Device

2. **Set Environment Variables:**
   - Add `ANDROID_HOME` environment variable pointing to your Android SDK location
   - Typically: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - Add to PATH: `%ANDROID_HOME%\platform-tools` and `%ANDROID_HOME%\tools`

3. **Create an Android Virtual Device (AVD):**
   - Open Android Studio
   - Go to Tools > Device Manager
   - Create a new virtual device

4. **Alternative: Use Expo Go app:**
   - Install Expo Go from Google Play Store on your physical Android device
   - Run `npm start` and scan the QR code with Expo Go

## iOS Setup (Mac only)

1. Install Xcode from the App Store
2. Install Xcode Command Line Tools: `xcode-select --install`
3. Run `npm run ios` to open iOS Simulator

## Web Development

You can also run the app in a web browser:
```bash
npm run web
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
- Form handling with React Hook Form
- 🎨 Modern UI with React Native components

## Development

- Uses Expo Router for file-based routing
- Zustand for state management
- React Hook Form for form handling
- AsyncStorage for local data persistence

## Troubleshooting

### Windows Path Issues
If you encounter `node:sea` path errors, the fix is already included in `metro.config.js`. If issues persist:
```bash
npm run fix-windows
```

### Package Version Warnings
If Expo shows package version warnings, run:
```bash
npm install
```
This will install the correct versions specified in package.json.

### Android SDK Not Found
- Make sure Android Studio is installed
- Set `ANDROID_HOME` environment variable
- Or use Expo Go app on a physical device instead

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
- Location services require appropriate permissions (configured in app.json)
- API endpoints should match the Next.js backend configuration
- For development, you can use Expo Go app on your phone without Android Studio
