import * as React from 'react';
import { View, SafeAreaView, ScrollView, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import Roadmap from  '../../../components/Roadmap';


function ChinaPage() {
  const nav = useNavigation();

  return (
    <SafeAreaView className="h-full w-full flex bg-[#F3ECE2]">
    <View style={{flex:1, alignItems: "center"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Roadmap></Roadmap>
      </ScrollView>
    </View>
  </SafeAreaView>

  );
}

function JapanPage() {

  const nav = useNavigation();

  return (
    <SafeAreaView className="h-full w-full flex bg-[#F3ECE2]">

    <View style={{flex:1, alignItems: "center"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Roadmap></Roadmap>
      </ScrollView>
    </View>
  </SafeAreaView>
  );

}

const Drawer = createDrawerNavigator();

// should be dynamic when made this way
export default function ExploreCuisine() {

  return (
      <Drawer.Navigator initialRouteName="China">
        <Drawer.Screen name="China" component={ChinaPage} />
        <Drawer.Screen name="Japan" component={JapanPage} />
      </Drawer.Navigator>
  );
}