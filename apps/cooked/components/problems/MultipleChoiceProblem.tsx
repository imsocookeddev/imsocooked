import Mascot from "@/assets/images/mascot.svg";
import { View, H4, Text, YStack, Button } from "tamagui";
import { Question } from "@cooked/trpc";

interface MultipleChoiceProblemProps {
  question: Question;
  setChoice: (choice: string) => void;
  choice: string;
}

export function MultipleChoiceProblem({
  question,
  setChoice,
  choice,
}: MultipleChoiceProblemProps) {
  const buttons: string[] = JSON.parse(question.problemContent);

  return (
    <YStack>
      <H4 color="#715948" fontSize="$8" fontWeight="bold" flex={0}>
        {question.prompt}
      </H4>
      <View alignSelf="flex-end" my="$8">
        <Mascot />
      </View>
      <YStack gap="$3">
        {buttons.map((buttonText, idx) => (
          <Button
            key={idx}
            onTouchStart={() => setChoice(buttonText)}
            pressStyle={{ bg: "#D9D9F9", borderWidth: 0 }}
            backgroundColor={choice == buttonText ? "#D9D9F9" : "#D9D9D996"}
            justifyContent="flex-start"
          >
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
