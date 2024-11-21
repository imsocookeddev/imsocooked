import { trpc } from "@/utils/trpc/client";
import { useLocalSearchParams, useRouter } from "expo-router";
import { H1, YStack } from "tamagui";
import Roadmap from "@/components/Roadmap";
import CuisineColors from "@/constants/CuisineColors";
import { X } from "@tamagui/lucide-icons";

export default function CuisinePage() {
  const { cuisineID } = useLocalSearchParams();
  const router = useRouter();
  const cuisineQuery = trpc.getCuisineByID.useQuery(cuisineID as string, {
    enabled: !!cuisineID,
  });

  return (
    <YStack flex={1} alignItems="center" backgroundColor="#F3ECE2" pt="$11">
      <H1 fontWeight="bold" fontSize="$10" color={CuisineColors[0].primary}>
        {cuisineQuery.data?.cuisineName}
      </H1>
      <Roadmap />
    </YStack>
  );
}
