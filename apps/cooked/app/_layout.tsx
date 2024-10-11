import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalProvider } from "tamagui";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { TamaguiProvider } from "tamagui";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import type { TokenCache } from "@clerk/clerk-expo/dist/cache/types";
import * as SecureStore from "expo-secure-store";

import { tamaguiConfig } from "../tamagui.config";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache: TokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);

      if (item) {
        console.log(`Retrieved key: ${item} from secure store.`);
      } else {
        console.log("Unable to get value for key: " + key);
      }

      return item;
    } catch (error) {
      console.error("SecureStore get item error: " + error);
      await SecureStore.deleteItemAsync(key);

      return null;
    }
  },
  async saveToken(key, token) {
    try {
      return await SecureStore.setItemAsync(key, token);
    } catch (error) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
          <PortalProvider shouldAddRootHost>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(app)" />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </PortalProvider>
        </TamaguiProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
