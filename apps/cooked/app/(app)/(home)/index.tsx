import { View, H4, XStack } from "tamagui";
import { trpc } from "@/utils/trpc/client";
import { InProgressBook } from "@/components/InProgressBook";
import { ExploreBook } from "@/components/ExploreBook";
import { ScrollView } from "tamagui";
import cuisineColors from "@/constants/CuisineColors";

export default function HomeScreen() {
  const cuisineQuery = trpc.getCuisineData.useQuery();

  function InProgressBookList() {
    if (cuisineQuery.isFetching) {
      return <H4>Loading Books...</H4>;
    } else if (cuisineQuery.data?.inProgress.length === 0) {
      return <H4>No Books in progress</H4>;
    } else {
      return cuisineQuery.data?.inProgress.map(
        ({ imageUrl: _, cuisineDescription: _1, ...cuisineProps }) => (
          <InProgressBook {...cuisineProps} key={cuisineProps.cuisineID} />
        ),
      );
    }
  }

  return (
    <ScrollView flex={1} backgroundColor="#F3ECE2" pt="$12" px="$2">
      {/* In Progress Section */}
      <View
        backgroundColor="#F0E3D2"
        py="$3"
        borderRadius="$8"
        px="$3"
        shadowRadius="$2"
        shadowOpacity={0.18}
        shadowColor="black"
        shadowOffset={{ height: 2, width: 0 }}
        mb="$5"
      >
        <H4 color="#715948" mb="$3" ml="$2" fontWeight="bold">
          Currently Cooking!
        </H4>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <InProgressBookList />
        </ScrollView>
      </View>
      <H4 color="#715948" ml="$2" fontWeight="bold">
        Explore
      </H4>
      {/* Explore Section */}
      <XStack
        flexWrap="wrap"
        gap="$3"
        py="$4"
        px="$5"
        justifyContent="space-between"
      >
        {cuisineQuery.data?.all.map(
          ({ cuisineDescription: _, ...cuisineProps }, idx) => (
            <ExploreBook
              {...cuisineProps}
              palette={cuisineColors[idx % cuisineColors.length]}
              key={cuisineProps.cuisineID}
            />
          ),
        )}
      </XStack>
    </ScrollView>
  );
}
