import { View, Text, Button } from "tamagui";
import { useAuth } from "@clerk/clerk-expo";
import {Link} from "expo-router";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View className="h-full justify-center items-center">
        <Button><Link href={"/(questions)/multiple-choice"}>Go to question</Link></Button>
    </View>
  );
}
