import { View, Text } from "tamagui";
import { Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      
      <View>
        <Text>This screen doesn't exist.</Text>
      </View>
    </>
  );
}
