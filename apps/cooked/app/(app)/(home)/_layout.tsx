import { Redirect, Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text } from "tamagui";
import { trpc } from "@/utils/trpc/client";
import { useUser } from "@clerk/clerk-expo";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const existingQuery = trpc.checkExistingUser.useQuery(undefined, {
    gcTime: 0,
    staleTime: 0,
  });

  // Query server to see if user exists within the database.
  useEffect(() => {
    if (existingQuery.isFetched) {
      if (existingQuery.error) {
        if (existingQuery.error.data?.httpStatus === 401) {
          console.error("Unable to find user");
        } else {
          console.error("Other error occurred" + existingQuery.error?.message);
        }
      }

      if (existingQuery.data === false) {
        router.push("/(app)/info");
      }
    }
  }, [existingQuery]);

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
      <Tabs.Screen
        name={"profile"}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => <Text>Profile</Text>,
        }}
      />
    </Tabs>
  );
}
