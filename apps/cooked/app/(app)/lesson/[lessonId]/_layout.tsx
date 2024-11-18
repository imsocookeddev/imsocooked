import {
  View,
  Text,
  YStack,
  XStack,
  Progress,
  ProgressIndicator,
  Button,
} from "tamagui";
import { Slot, useLocalSearchParams, useRouter } from "expo-router";
import { X } from "@tamagui/lucide-icons";
import { trpc } from "@/utils/trpc/client";
import { useState } from "react";

export default function LessonLayout() {
  const { lessonId } = useLocalSearchParams();
  const [progress, setProgress] = useState(30 % 100);
  // const lessonDataQuery = trpc.getLessonsByCountry.useQuery(lessonId as string);
  const router = useRouter();

  return (
    <YStack flex={1} alignItems="center" bg="#F3ECE2" px="$5">
      <XStack mt="$11" mb="$6" alignItems="center" gap="$3" px="$6">
        <X color="#a57d5b" size="$3" />
        <Progress
          key={0}
          size="$4"
          value={progress}
          backgroundColor="#D9D9D9"
          borderWidth={1}
          borderColor="#C9C9C9"
          height="$2"
          max={100}
        >
          <ProgressIndicator animation="bouncy" backgroundColor="#F37070" />
        </Progress>
      </XStack>

      <YStack
        bg="#FDFDFD8A"
        flex={1}
        alignSelf="stretch"
        mb="$8"
        borderRadius="$8"
        padding="$4"
      >
        <Slot />
      </YStack>
      <Button mb="$9" height="$5" alignSelf="stretch" bg="#5aa083">
        <Text fontSize="$8" fontWeight="bold">
          Check
        </Text>
      </Button>
    </YStack>
  );
}
