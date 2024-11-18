import { Redirect, Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {Image} from "tamagui";
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
                <Image source={{uri: "https://www.figma.com/file/JiMKqhf6sFiliZrHz1yP02/image/bb54b653e182bd11af424950054c77872de9fb99", width: 30, height: 30}}/>
            ),
          }}
      />
      <Tabs.Screen
          name={"profile"}
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
                <Image source={{uri: "https://www.figma.com/file/JiMKqhf6sFiliZrHz1yP02/image/bf5370f0112634402ee1229ece89f240589988e0", width: 30, height: 30}} />
            ),
          }}
      />
    </Tabs>
  );
}
