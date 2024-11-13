import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(home)"} />;
  }

  return <Drawer screenOptions={{ headerShown: false }} />;
}
