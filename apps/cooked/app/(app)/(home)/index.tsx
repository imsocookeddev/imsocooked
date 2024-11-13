import { View, Text, Button } from "tamagui";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View className="h-full justify-center items-center">
      <Button onPress={() => signOut()}>Log out</Button>
    </View>
  );
}
