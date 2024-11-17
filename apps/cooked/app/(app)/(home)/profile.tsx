import {Avatar, Button, H1, SizableText, View, XStack, YStack} from "tamagui";
import {useAuth} from "@clerk/clerk-expo";
import {Redirect} from "expo-router";

export default function ProfileView() {

    const { userId, signOut } = useAuth();
    if (!userId) return <Redirect href={"/(auth)/sign-in"}/>

    return (
        <View className="h-full w-full bg-[#38AA7E]">
            <YStack gap={"$4"} marginVertical={"$4"}>
                <H1 marginHorizontal={"$4"}>Profile</H1>
                <XStack marginHorizontal={"$4"} gap={"$4"}>
                    <Avatar circular size={"$10"}>
                        <Avatar.Image
                            accessibilityLabel={"username"}
                            src={"https://avatars.githubusercontent.com/u/113381905?v=4&size=64"} //TODO: Change hardcode
                        />
                        <Avatar.Fallback backgroundColor={"$blue10"} />
                    </Avatar>
                    <YStack alignSelf={"flex-end"} marginBottom={"$2"}>
                        <SizableText size={"$5"}>Jacob Ellerbrock</SizableText> //TODO: Change hardcode
                        <SizableText size={"$5"}>jacob@imsocooked.org</SizableText> //TODO: Change hardcose
                    </YStack>
                </XStack>
                <YStack backgroundColor={"#F3ECE2"} borderRadius={"$10"} minHeight={1000} paddingTop={"$8"} paddingHorizontal={"$4"} position={"relative"}>
                    <H1 color={"black"}>Account Settings</H1>
                    <Button onPress={() => signOut()}>Log out</Button>
                </YStack>
            </YStack>
        </View>
    )
}