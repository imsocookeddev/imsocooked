import {Avatar, Button, H1, SizableText, View, XStack, YStack, Text, Input, Form, Spinner, Label} from "tamagui";
import {useAuth} from "@clerk/clerk-expo";
import {Redirect, router} from "expo-router";
import {trpc} from "@/utils/trpc/client";
import {useEffect, useState} from "react";
import {user as Users} from "@cooked/db/schema"

export default function ProfileView() {

    type User = typeof Users.$inferSelect;

    const { userId, signOut } = useAuth();
    if (!userId) return <Redirect href={"/(auth)/sign-in"}/>

    const [user, setUser] = useState<User>();

    const res = trpc.echoUserData.useQuery()
    const updateRes = trpc.updateUserData.useMutation();

    useEffect(() => {
        if (res.isFetched) {
            if (res.data?.message === undefined) router.replace("/(auth)/sign-in");
            setUser(res.data?.message)
        }
    }, [res]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        if (res.isFetched) {
            if (res.data?.message === undefined) return
            setNewFirstName(res.data?.message.firstName)
            setNewLastName(res.data?.message.lastName)
            setNewEmail(res.data?.message.email)
        }
    }, [updateRes]);

    if (!user) return <Redirect href={"/(auth)/sign-in"}/>

    async function onSubmit() {
        setIsLoading(true);

        const {success} = await updateRes.mutateAsync({
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
        })
        if (!success) console.log("Error updating data")
        setIsLoading(false);
    }

    /* TODO:
        Change hardcode avatar, name, and email
    * */
    return (
        <View className="h-full w-full bg-[#38AA7E]">
            <YStack gap={"$4"} marginVertical={"$4"}>
                <H1 marginHorizontal={"$4"}>Profile</H1>
                <XStack marginHorizontal={"$4"} gap={"$4"}>
                    <Avatar circular size={"$10"}>
                        <Avatar.Image
                            accessibilityLabel={"username"}
                            src={"https://avatars.githubusercontent.com/u/113381905?v=4&size=64"}
                        />
                        <Avatar.Fallback backgroundColor={"$blue10"} />
                    </Avatar>
                    <YStack alignSelf={"flex-end"} marginBottom={"$2"}>
                        <SizableText size={"$5"}>{user.firstName + " " + user.lastName}</SizableText>
                        <SizableText size={"$5"}>{user.email}</SizableText>
                    </YStack>
                </XStack>
                <YStack backgroundColor={"#F3ECE2"} borderRadius={"$10"} minHeight={1000} paddingTop={"$8"} paddingHorizontal={"$4"} position={"relative"}>
                    <H1 color={"black"}>Account Settings</H1>
                    <Form onSubmit={onSubmit}>
                        <Label color={"black"}>First Name</Label>
                        <Input size={"$3"} onChangeText={(t) => setNewFirstName(t)}>{newFirstName}</Input>
                        <Label color={"black"}>Last Name</Label>
                        <Input size={"$3"} onChangeText={(t) => setNewLastName(t)}>{newLastName}</Input>
                        <Label color={"black"}>Email</Label>
                        <Input size={"$3"} onChangeText={(t) => setNewEmail(t)}>{newEmail}</Input>
                        <Form.Trigger asChild disabled={isLoading}><Button marginVertical={"$5"} icon={isLoading ? () => <Spinner /> : undefined}>
                            Save
                        </Button></Form.Trigger>
                    </Form>
                    <Button onPress={() => signOut()}><Text>Log out</Text></Button>
                </YStack>
            </YStack>
        </View>
    )
}