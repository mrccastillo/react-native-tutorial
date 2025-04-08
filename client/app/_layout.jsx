import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Safescreen from "./components/Safescreen";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Safescreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </Safescreen>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
