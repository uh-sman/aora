import { Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";

function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="/search" options={{ headerShown: false }} />
    </Stack>
    </GlobalProvider>
  );
}

export default RootLayout;
