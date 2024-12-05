import Mascot from "@/assets/images/mascot.svg";
import { Dimensions, ScrollView } from "react-native";
import { View, H4, Text, YStack, XStack, Progress, Button } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { X } from "@tamagui/lucide-icons";
import { useCallback, useEffect, useState } from "react";
import { useLessonManager } from "@/hooks/useLessonManager";
import { MultipleChoiceProblem } from "@/components/problems/MultipleChoiceProblem";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { trpc } from "@/utils/trpc/client";
import { Question } from "@cooked/trpc";
import { QuestionSkeleton } from "@/components/skeletons/QuestionSkeleton";

function ShowcasePage() {
  const buttons = [
    "4oz each egg",
    "1oz each egg",
    "2oz each egg",
    "3oz each egg",
  ];

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

export default function QuestionScreen() {
  const { lessonID } = useLocalSearchParams();
  const [choice, setChoice] = useState("");
  const router = useRouter();
  const questionQuery = trpc.getLessonData.useQuery({
    lessonID: lessonID as string,
  });
  const {
    progress,
    correct,
    incorrect,
    currentQuestion,
    error,
    isComplete,
    updateQuestionList,
  } = useLessonManager();
  const screenWidth = Dimensions.get("window").width;

  const safelySetChoice = useCallback(
    (choice: string) => {
      setChoice(choice);
    },
    [setChoice],
  );

  const questionAnimValue = useSharedValue(0);

  const animatedQuestionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            questionAnimValue.value,
            [0, 1],
            [screenWidth, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  useEffect(() => {
    questionAnimValue.value = 0;

    requestAnimationFrame(() => {
      questionAnimValue.value = withTiming(1, { duration: 500 });
    });
  }, [currentQuestion]);

  useEffect(() => {
    if (isComplete) {
      router.push({
        pathname: "/lesson/[lessonID]/complete",
        params: { lessonID: lessonID as string },
      }); // TODO: complete the lesson here
    }
  }, [isComplete]);

  useEffect(() => {
    if (questionQuery.isSuccess) {
      const filteredQuestions = questionQuery.data.problems.filter(
        (problem): problem is Question => problem !== null,
      );

      updateQuestionList(filteredQuestions);
    } else if (questionQuery.isError) {
      console.error(
        "Error occurred while fetching questions: " +
          questionQuery.error.message,
      );
    }
  }, [questionQuery.isSuccess, questionQuery.isError]);

  if (error) {
    return <Text>{error}</Text>;
  }

  const CurrentQuestion = () => {
    if (!currentQuestion) {
      return <QuestionSkeleton />;
    }
    switch (currentQuestion.problemType) {
      case "mulitple_choice":
        return (
          <Animated.View style={animatedQuestionStyle}>
            <MultipleChoiceProblem
              question={currentQuestion}
              setChoice={safelySetChoice}
              choice={choice}
            />
          </Animated.View>
        );
      case "drag-n-drop":
        console.error("Unimplemented problem type: drag-n-drop");
        break;
      case "single_word_response":
        console.error("Unimplemented problem type: single_word_response");
        break;
      case "matching":
        console.error("Unimplemented problem type: matching");
        break;
    }
  };

  const handleProblemSubmission = () => {
    if (
      `"${choice.trim().toLowerCase()}"` ===
      currentQuestion.correctAnswer.trim().toLowerCase()
    ) {
      correct();
    } else {
      incorrect();
    }
  };

  return (
    <YStack flex={1} alignItems="center" bg="#F3ECE2" px="$5">
      <XStack mt="$11" mb="$6" alignItems="center" gap="$3" px="$6">
        <X color="#a57d5b" size="$3" />
        <Progress
          key={0}
          value={progress}
          size="$4"
          backgroundColor="#D9D9D9"
          borderWidth={1}
          borderColor="#C9C9C9"
          height="$3"
          max={100}
        >
          <Progress.Indicator animation="bouncy" backgroundColor="#F37070" />
        </Progress>
      </XStack>
      <YStack
        bg="#FDFDFD8A"
        flex={1}
        alignSelf="stretch"
        mb="$8"
        borderRadius="$8"
        padding="$4"
        overflow="hidden"
      >
        <CurrentQuestion />
      </YStack>
      <Button
        mb="$9"
        height="$5"
        alignSelf="stretch"
        bg="#5aa083"
        onPress={handleProblemSubmission}
      >
        <Text fontSize="$8" fontWeight="bold">
          Check
        </Text>
      </Button>
    </YStack>
  );
}
