import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Safescreen from "./components/Safescreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";

export default function RootLayout() {
  const { user, token, checkAuth } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  //check the auth
  useEffect(() => {
    checkAuth();
  });

  //redirect the page to (tabs) if logged in
  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isAuthenticated = user && token;

    if (!isAuthenticated && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isAuthenticated && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments]);

  return (
    <SafeAreaProvider>
      <Safescreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </Safescreen>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
