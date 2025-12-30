import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="sign-up/[userType]" />
          <Stack.Screen name="forgot-password" />
          <Stack.Screen name="search" />
          <Stack.Screen name="individual" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

