import { trpc } from "@/utils/trpc/client";
import { useLocalSearchParams, useRouter } from "expo-router";
import { H1, YStack } from "tamagui";
import Roadmap from "@/components/Roadmap";
import CuisineColors from "@/constants/CuisineColors";
import { X } from "@tamagui/lucide-icons";
import BookPath from "@/components/BookPath";

export default function CuisinePage() {
  const { cuisineID } = useLocalSearchParams();
  const router = useRouter();
  const cuisineQuery = trpc.getCuisineByID.useQuery(cuisineID as string, {
    enabled: !!cuisineID,
  });

  return (
    <YStack flex={1} alignItems="center" backgroundColor="#F3ECE2" pt="$9">
      
      <BookPath />
    </YStack>
  );
}
