import { Tabs, Redirect } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text } from "tamagui";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useUser } from "@clerk/clerk-expo";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Text color="$color.blue7Light">Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => <Text>Explore</Text>,
        }}
      />
    </Tabs>
  );
}
