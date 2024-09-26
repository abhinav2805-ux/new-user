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

  // State to manage if the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  // Load custom fonts using Expo
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide splash screen when the fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setIsMounted(true); // Set the component as mounted after fonts are loaded
    }
  }, [loaded]);

  // Redirect to SignIn screen if not signed in and the component is mounted
  useEffect(() => {
    if (isMounted && !isSignedIn) {
      router.push('/signin');
    }
  }, [isMounted, isSignedIn]);

  // Show nothing while fonts are loading
  if (!loaded) {
    return null;
  }

  // Return the layout and navigation structure
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack  screenOptions={{
        headerShown: false, 
      }} >
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
