import { Question } from "@cooked/trpc";
import { useState } from "react";
import { YStack, H4, Input, Button } from "tamagui";

interface SingleWordResponseProps {
  question: Question;
  setChoice: (choice: string) => void;
}

export function SingleWordResponseProblem({
  question,
  setChoice,
}: SingleWordResponseProps) {
    const [userInput, setUserInput] = useState("");

  return (
    <YStack gap="$4">
      <H4 color="#715948" fontSize="$8" fontWeight="bold">
        {question.prompt}
      </H4>
      <Input
        placeholder="Type your response here..."
        onChangeText={(text) => {
          setUserInput(text); 
        }}
        bg="#F3F3F3"
        color="#715948"
        fontSize="$5"
      />
      <Button
        onPress={() => {
          setChoice(userInput.trim());
        }}
        bg="#D9D9D996"
        justifyContent="center"
      >
        Submit
      </Button>
    </YStack>
  );
}