import { Link } from "expo-router";
import { Image, View, Text, XStack, YStack, H4 } from "tamagui";

interface CuisineBookProps {
  cuisineName: string;
  cuisineID: string;
  imageUrl: string;
  palette: BookColorPalette;
}

export function ExploreBook({
  cuisineID,
  cuisineName,
  imageUrl,
  palette,
}: CuisineBookProps) {
  return (
    <Link
      href={{ pathname: "/(app)/cuisine/[cuisineID]", params: { cuisineID } }}
    >
      <XStack
        h="$14"
        w="$12"
        shadowRadius="$2"
        shadowOpacity={0.28}
        shadowColor="black"
        shadowOffset={{ height: 2, width: 0 }}
      >
        <View
          borderTopLeftRadius="$4"
          borderBottomLeftRadius="$4"
          backgroundColor={palette.secondary}
          w={10}
          flexGrow={1}
        />
        <YStack
          backgroundColor={palette.primary}
          flexGrow={10}
          borderTopRightRadius="$4"
          borderBottomRightRadius="$4"
          gap="$3"
        >
          <View
            mt="$6"
            backgroundColor={palette.tertiary}
            alignItems="center"
            mx="$3"
          >
            <H4 fontWeight="bold" fontStyle="italic" color="#715948">
              {cuisineName}
            </H4>
          </View>
          <Image
            alignSelf="center"
            source={{
              uri: imageUrl,
              height: 90,
              width: 90,
            }}
          />
        </YStack>
      </XStack>
    </Link>
  );
}
