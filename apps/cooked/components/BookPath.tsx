import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { H4, Text, View } from 'tamagui';
import Roadmap from './Roadmap';
import { trpc } from "@/utils/trpc/client";
import { useLocalSearchParams, useRouter } from "expo-router";
import { H1, YStack } from "tamagui";
// import Roadmap from "@/components/Roadmap";
import CuisineColors from "@/constants/CuisineColors";
import { Rows, X } from "@tamagui/lucide-icons";
// import BookPath from "@/components/BookPath";

export default function BookPath () {

  
  const [verticalTab, setVerticalTab] = useState("China");

  const { cuisineID } = useLocalSearchParams();
  const router = useRouter();
  const cuisineQuery = trpc.getCuisineByID.useQuery(cuisineID as string, {
    enabled: !!cuisineID,
  });


  return (
    
    <View className="flex flex-row">
      <ScrollView className="w-80 bg-[#F3ECE2] padding-10">

        <View>
          <View flexDirection="row" justifyContent="space-between">
            <H1 color="#715948" fontWeight="bold" textAlign="left" fontSize={20} mb="$-6" mt="$5" ml="$6">
              {cuisineQuery.data?.cuisineName}
            </H1>
            <H1 color="#715948" fontWeight="bold" textAlign="right" fontSize={20} mb="$-6" mt="$5" mr="$6">
              {verticalTab}
            </H1>
          </View>
          <View>
            <H4 color={CuisineColors[0].primary} fontWeight="bold" textAlign="center" fontSize={30} mb="$-6" mt="$5">
              {verticalTab}
            </H4>
          </View>
        </View>

        {verticalTab === "China" &&
          <Roadmap></Roadmap>}
        {verticalTab === "Japan" &&
          <Roadmap></Roadmap>}
        {verticalTab === "Thai" &&
          <Roadmap></Roadmap>}
        {verticalTab === "Korea" &&
          <Roadmap></Roadmap>}

      </ScrollView>
        
      <ScrollView className="w-1 bg-[#E6D9C7] py-2">
        {["China", "Japan", "Thai", "Korea"].map((tab) => (
          
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              verticalTab === tab ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setVerticalTab(tab)}
          >
            
            <Text color="#715948" fontWeight="bold" 
              style={verticalTab === tab ? styles.activeText : styles.inactiveText}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>

    
  );
}

const styles = StyleSheet.create({
  
  tab: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
    alignItems: "center",
  },

  activeTab: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#F3ECE2",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },  

  inactiveTab: {
    backgroundColor: "#CCC4B8",
  },

  activeText: {
    color: "pink",
  },
  
  inactiveText: {
    color: "#333",
  }
});