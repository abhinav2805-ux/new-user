import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme'; // Assuming you have this hook

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  
  // Detect the color scheme (dark or light mode)
  const colorScheme = useColorScheme();

  // State to manage whether the user is signed in or not
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Load custom fonts using Expo
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide splash screen when the fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Redirect to SignIn screen if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/signin');
    }
  }, [isSignedIn]);

  // Show nothing while fonts are loading
  if (!loaded) {
    return null;
  }

  // Return the layout and navigation structure
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Only show tabs if signed in */}
        {isSignedIn && (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
        {/* SignIn screen */}
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: true }} />
      </Stack>
    </ThemeProvider>
  );
}
