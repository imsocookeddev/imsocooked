import {AlertDialog, Avatar, Button, H1, SizableText, Text, View, XStack, YStack} from "tamagui";
import {useAuth} from "@clerk/clerk-expo";

export default function ProfileView() {

    const { signOut } = useAuth();

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
                    <AlertDialog native>
                        <AlertDialog.Trigger asChild>
                            <Button width={250} height={30} alignSelf={"center"} position={"absolute"} top={480} backgroundColor={"#FE6F6C"} color={"white"}>Sign Out</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay
                                key={"overlay"}
                                animation={"quick"}
                                opacity={0.5}
                                enterStyle={{ opacity: 0 }}
                                exitStyle={{ opacity: 0 }}
                            />
                            <AlertDialog.Content
                                bordered
                                elevate
                                key="content"
                                animation={[
                                    'quick',
                                    {
                                        opacity: {
                                            overshootClamping: true,
                                        },
                                    },
                                ]}
                                enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                                exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                                x={0}
                                scale={1}
                                opacity={1}
                                y={0}
                            >
                                <YStack space>
                                    <AlertDialog.Description>
                                        Are you sure you want to sign out?
                                    </AlertDialog.Description>
                                    <XStack gap="$3" justifyContent="flex-end">
                                        <AlertDialog.Cancel asChild>
                                            <Button>No</Button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action asChild>
                                            <Button onPress={() => signOut()} color={"red"}>Yes</Button>
                                        </AlertDialog.Action>
                                    </XStack>
                                </YStack>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog>
                    {/*<Button onPress={() => signOut()}>Log out</Button>*/}
                </YStack>
            </YStack>
        </View>
    )
}