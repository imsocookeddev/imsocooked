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

    return (
        <View className="h-full w-full bg-[#38AA7E]">
            <YStack gap={"$4"} marginVertical={"$4"}>
                <H1 
                style={{
                    marginTop: 20,
                    textAlign: "center",
                    fontSize: 26}}
                marginHorizontal={"$4"}>Profile</H1>
                <XStack marginHorizontal={"$4"} gap={"$4"}>
                    <Avatar circular size={"$10"}>
                        <Avatar.Image
                            accessibilityLabel={"username"}
                            src={user.profileUrl}
                        />
                        <Avatar.Fallback backgroundColor={"$blue10"} />
                    </Avatar>
                    <YStack alignSelf={"flex-end"} marginBottom={"$2"}>
                        <SizableText size={"$5"}>{user.firstName + " " + user.lastName}</SizableText>
                        <SizableText size={"$5"}>{user.email}</SizableText>
                    </YStack>
                </XStack>
                <YStack backgroundColor={"#F3ECE2"} borderRadius={"$10"} minHeight={1000} paddingTop={"$8"} paddingHorizontal={"$4"} position={"relative"}>
                    <H1 color={"black"}
                    style={{ 
                        marginBottom:10,
                        fontSize: 30,
                    }}

                    >Account Settings</H1>
                    <Form onSubmit={onSubmit}>
                        <Label color={"black"}>First Name</Label>
                        <Input size={"$3"} backgroundColor={"#E9E1D7"} color="black" onChangeText={(t) => setNewFirstName(t)}>{newFirstName}</Input>
                        <Label color={"black"}>Last Name</Label>
                        <Input size={"$3"} backgroundColor={"#E9E1D7"} color="black" onChangeText={(t) => setNewLastName(t)}>{newLastName}</Input>
                        <Label color={"black"}>Email</Label>
                        <Input
                        style={{ marginBottom: 40}}
                        size={"$3"} backgroundColor={"#ADADAD"} color="black" onChangeText={(t) => setNewEmail(t)}>{newEmail}</Input>
                        <Form.Trigger asChild disabled={isLoading}><Button    
                        style={{
                        backgroundColor: "transparent", 
                        borderColor: "#38AA7E", 
                        borderWidth: 2, // Border thickness
                        borderRadius: 25, // Rounded corners
                        height: 40, // Adjust height
                        justifyContent: "center", // Center text vertically
                        alignItems: "center", // Center text horizontally
                        marginVertical: 10, // Spacing
                        }}
                        color= "black"
                        marginVertical={"$5"} icon={isLoading ? () => <Spinner /> : undefined}>
                        Save
                        </Button></Form.Trigger>
                    </Form>
                    <Button 
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5, // For Android
                        marginBottom: 40,
                      }}                         
                    backgroundColor="#FE6F6C" borderRadius={25} color="black" onPress={() => signOut()}><Text>Log out</Text></Button>
                </YStack>
            </YStack>
        </View>
    )
}