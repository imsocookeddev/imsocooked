import { Redirect, Slot } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function ExtraInformationLayout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Slot />;
}
