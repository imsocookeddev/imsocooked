import { Image, Text, YStack } from "tamagui";
import { Link } from "expo-router";
import book from "@/assets/images/book.png";

interface CuisineBookProps {
  cuisineName: string;
  cuisineID: string;
}

export function InProgressBook({ cuisineName, cuisineID }: CuisineBookProps) {
  return (
    <Link
      href={{ pathname: "/(app)/cuisine/[cuisineID]", params: { cuisineID } }}
    >
      <YStack>
        <Image source={book} height={80} width={80} />
        {/* Text under the image */}
        <Text style={{ textAlign: "center", color: "#715948F0" }}>
          {cuisineName}
        </Text>
      </YStack>
    </Link>
  );
}
