// inside of the apps/cooked/app/(app)/lesson/[lessonID]/complete/index.tsx
import { H1, Text, YStack, Button } from "tamagui";
import { trpc } from "@/utils/trpc/client";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Linking } from "react-native";
import { Link } from "expo-router";

export default function LessonCompleted() {
  const { lessonID } = useLocalSearchParams();
  const router = useRouter();
  const lessonDataQuery = trpc.getIndividualLessonData.useQuery({
    lessonID: lessonID as string,
  });

  return (
    <YStack
      bg="#F3ECE2"
      flex={1}
      gap="$4"
      alignItems="center"
      justifyContent="center"
      padding="$6"
      rowGap="$12"
    >
      <H1 color="#715948" fontSize="$10" fontWeight="bold">
        Congratulations!
      </H1>
      <Text color="#715948AB" fontSize="$6" textAlign="center">
        You’ve completed this lesson. Great job!
      </Text>
      {lessonDataQuery.isSuccess && (
        <Button
          bg="#5aa083"
          onPress={() =>
            Linking.openURL(lessonDataQuery.data?.recipeUrl as string)
          }
          target="_blank"
          justifyContent="center"
        >
          View Recipe
        </Button>
      )}
      <Button bg="#5aa083" onPress={() => router.navigate("/(app)/(home)")}>
        Back Home
      </Button>
    </YStack>
  );
}
