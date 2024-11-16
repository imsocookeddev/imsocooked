import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(app)/(home)" />;
  }

  return (
    <GestureHandlerRootView>
      <Drawer screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
