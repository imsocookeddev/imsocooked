import React from 'react';
import { View, Image, ScrollView, Text} from 'react-native';
import tw from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Page from '../assets/images/road.png';
import Page2 from '../assets/images/road2c.png';
import Page3 from '../assets/images/road3c.png';

import Check from '../assets/images/check.png';

const ImageArray = () => {

    const ImageMap = [
        {
            src: Page,
            id: 'img1',
            style: {
                width: 170,
                height: 160,
                marginLeft: 136,
            },
            description: 'First image',
          },
        {
            src: Check,
            id: 'check',
            style: {
              width: 50,
              height: 50,
              marginLeft: 195,
            },
            description: 'Check',
          },
          {
            src: Page2,
            id: 'img2',
            style: {
                width: 160,
                height: 150,
                marginLeft: 75,
            },
            description: 'Second image',
          },
          {
            src: Check,
            id: 'check',
            style: {
              width: 50,
              height: 50,
              marginLeft: 130,
            },
            description: 'Check',
          },
          {
            src: Page3,
            id: 'img3',
            style: {
                width: 180,
                height: 173,
                marginLeft: 65,
            },
            description: 'Third image',
          },
          {
            src: Check,
            id: 'check',
            style: {
              width: 50,
              height: 50,
              marginLeft: 205,
            },
            description: 'Check',
          },
    ];
    
    
     // Map over the array to create Image components
     const imageComponents = ImageMap.map((image) => (
        <View key={image.id} style={{ }}>
          <Image source={image.src} style={image.style} />
        </View>
      ));
    
      // Render the images in a scrollable view    
      return (
        <SafeAreaView>
          <ScrollView>
            {imageComponents}
        </ScrollView>
        </SafeAreaView>

      );
}

  export default ImageArray;
