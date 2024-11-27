import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { H4, Text } from 'tamagui';
import Roadmap from './Roadmap';

export default function BookPath () {

  const [verticalTab, setVerticalTab] = useState("China");

  return (
    
    <SafeAreaView className="flex flex-row">
      <ScrollView className="w-80 bg-[#F3ECE2] padding-10">

        <H4 color="#715948" fontWeight="bold" textAlign="center" fontSize={30} mb="$-6" mt="$5">
            {verticalTab}
        </H4>

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

    </SafeAreaView>

    
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