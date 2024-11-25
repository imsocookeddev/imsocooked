import { View, Text, YStack, XStack, H4, Button } from "tamagui";
import Mascot from "@/assets/images/mascot.svg";

const buttons = [
  "4oz each egg",
  "1oz each egg",
  "2oz each egg",
  "3oz each egg",
];

export default function QuestionScreen() {
  return (
    <YStack>
      <H4 color="#715948" fontSize="$8" fontWeight="bold" flex={0}>
        How much water would you need to boil?
      </H4>
      <View alignSelf="flex-end" mb="$8">
        <Mascot />
      </View>
      <YStack gap="$3">
        {buttons.map((buttonText) => (
          <Button bg="#D9D9D996" justifyContent="flex-start">
            <Text
              color="#715948AB"
              fontSize="$5"
              fontWeight="bold"
              textAlign="right"
            >
              {buttonText}
            </Text>
          </Button>
        ))}
      </YStack>
    </YStack>
  );
}
