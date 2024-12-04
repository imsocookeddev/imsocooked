import { useState } from "react";
import { Separator, Button, Form, H4, Input, View, Text } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, isClerkAPIResponseError } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import type { ClerkAPIError } from "@clerk/types";
import { z } from "zod";
import { Keyboard, ImageBackground,  } from "react-native";
import backgroundImage from "@/assets/images/background2.png";
import { OAuthProviders } from "@/components/OAuthProviders";

const signInSchema = z.object({
  emailAddress: z.string().trim().email(),
  password: z.string().trim().max(24).min(8),
});

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const [formClerkErrors, setFormClerkErrors] = useState<ClerkAPIError[]>();

  const handleFormSubmit = async ({
    emailAddress,
    password,
  }: z.infer<typeof signInSchema>) => {
    setFormClerkErrors(undefined);

    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(app)/(home)");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setFormClerkErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <ImageBackground
    source={backgroundImage}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <View
      className="h-screen px-4 py-14 justify-center"
      onPress={() => Keyboard.dismiss()}
    >
      <Form
        className="flex h-full items-center justify-evenly rounded-lg px-9"
        onSubmit={handleSubmit(handleFormSubmit)}
         backgroundColor="#F3ECE2"
        borderColor="$borderColor"
      >
        <View className="flex justify-center items-center h-40">
          <H4 
           style={{ color: "black", fontSize: 35 }}
          className="text-5xl">Sign In</H4>
        </View>
        <View className="w-full -mb-5" gap="$2">
          <Controller
            name="emailAddress"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <View gap="$2">
                <Text className="text-red-600 text-right mr-2">
                  {errors[name]?.message}
                </Text>
                <Input
                  className="w-full h-14 text-lg"
                  placeholder="Email Address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"

                  style={{
                    backgroundColor: "#E5DDD2",
                    color: "black",
                    borderColor: "gray",
                    height: 50,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                />
              </View>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <View gap="$2">
                <Text className="text-red-600 text-right mr-2">
                  {errors[name]?.message}
                </Text>
                <Input
                  className="w-full h-14 text-lg"
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry

                  style={{
                    backgroundColor: "#E5DDD2",
                    color: "black",
                    borderColor: "gray",
                    height: 50,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                />
              </View>
            )}
          />
        </View>
        <View className="w-full" gap="$2">
          <Text className="text-red-600 text-right">
            {formClerkErrors && formClerkErrors[0].message}
          </Text>
          <Form.Trigger asChild className="w-full h-14">
            <Button 
              style={{
                backgroundColor: "#38AA7E",
                height: 50,
                justifyContent: "center",
                borderRadius: 5,
              }}
            className="text-xl">Log In</Button>
          </Form.Trigger>
        </View>
        <View className="items-center justify-center" gap="$1">
          <Text 
           style={{ color: "orange", fontSize: 16 }}
          className="text-lg">Don't have an account?</Text>
          <Link href="/sign-up">
            <Text className="w-full text-sky-600 text-lg">Sign Up</Text>
          </Link>
        </View>
        <Separator className="border-2 self-stretch" />
        <OAuthProviders />
      </Form>
    </View>
    </ImageBackground>
  );
}
