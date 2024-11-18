import { View, Image, Text } from "tamagui";

export default function HomeScreen() {
  return (
    <View style={{ backgroundColor: '#F3ECE2' }} className="h-full relative">
      {/* Currently Cooking Section */}
      <View
        style={{
          width: 376,            // Width of the rectangle
          height: 200,           // Height of the rectangle
          backgroundColor: '#F0E3D2',  // Rectangle color
          overflow: 'hidden',
          position: 'absolute',
          top: 50,
        }}
      >
        {/* Displaying the text */}
        <Text style={{ position: 'absolute', top: 10, left: 10, color: '#715948F0' }}>Currently cooking!</Text>

        {/* Row for images */}
        <View
          style={{
            justifyContent: 'space-between', // Spacing between images
            flexDirection: 'row', // Align images in a row
            position: 'absolute',
            top: 20, // Position the images below the text
            left: 0,
            right: 0,
            height: '100%', // Ensures that the row takes the full height of the parent container
          }}
        >
          <View style={{ width: '30%' }}>
            <Image
              source={require("@/assets/images/book.png")}
              style={{ width: '100%', height: '80%' }} // Adjust the width to fit the images
              resizeMode="contain"  // Keeps the aspect ratio
            />
            <Text style={{ textAlign: 'center', color: '#715948F0' }}>Greek</Text> {/* Text under the image */}
          </View>
          <View style={{ width: '30%' }}>
            <Image
              source={require("@/assets/images/book.png")}
              style={{ width: '100%', height: '80%' }}
              resizeMode="contain"
            />
            <Text style={{ textAlign: 'center', color: '#715948F0' }}>American</Text> {/* Text under the image */}
          </View>
          <View style={{ width: '30%' }}>
            <Image
              source={require("@/assets/images/book.png")}
              style={{ width: '100%', height: '80%' }}
              resizeMode="contain"
            />
            <Text style={{ textAlign: 'center', color: '#715948F0' }}>European</Text> {/* Text under the image */}
          </View>
        </View>
      </View>

      {/* Explore Section */}
      <View
        style={{
          marginTop: 300, // Push below the "Currently Cooking" section
          padding: 10,
        }}
      >
        <Text style={{ color: '#715948F0', fontSize: 18, marginBottom: 10 }}>Explore</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {/* Card 1 */}
          <View style={{ width: '30%', marginBottom: 20 }}>
            <Image
              source={require("@/assets/images/book.png")}
              style={{ width: '100%', height: 120 }}
              resizeMode="contain"
            />
            <Text style={{ textAlign: 'center', color: '#715948F0', marginTop: 5 }}>Asian</Text>
          </View>
          {/* Card 2 */}
          <View style={{ width: '30%', marginBottom: 20 }}>
            <Image
              source={require("@/assets/images/book.png")}
              style={{ width: '100%', height: 120 }}
              resizeMode="contain"
            />
            <Text style={{ textAlign: 'center', color: '#715948F0', marginTop: 5 }}>Indian</Text>
          </View>
          {/* Card 3 */}
          <View style={{ width: '30%', marginBottom: 20 }}>
            <Image
              source={require("@/assets/images/book.png")}
              style={{ width: '100%', height: 120 }}
              resizeMode="contain"
            />
            <Text style={{ textAlign: 'center', color: '#715948F0', marginTop: 5 }}>Mexican</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
