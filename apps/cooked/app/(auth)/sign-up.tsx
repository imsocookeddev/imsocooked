import { useState } from "react";
import { Separator, Button, Form, H4, Input, View, Text } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp, isClerkAPIResponseError } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import type { ClerkAPIError } from "@clerk/types";
import { z } from "zod";
import { CodeInputSheet } from "@/components/CodeInputSheet";
import { Keyboard } from "react-native";
import { OAuthProviders } from "@/components/OAuthProviders";

const signUpSchema = z
  .object({
    emailAddress: z.string().trim().email(),
    password: z.string().trim().max(24).min(8),
    confirmPassword: z.string().trim().max(24).min(8),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [formClerkErrors, setFormClerkErrors] = useState<ClerkAPIError[]>();
  const [otpClerkErrors, setOtpClerkErrors] = useState<ClerkAPIError[]>();

  const handleFormSubmit = async ({
    emailAddress,
    password,
  }: z.infer<typeof signUpSchema>) => {
    setFormClerkErrors(undefined);

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) setFormClerkErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(home)");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setOtpClerkErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <View
      className="h-screen px-4 py-14 justify-center"
      onPress={() => Keyboard.dismiss()}
    >
      <CodeInputSheet
        open={pendingVerification}
        onSubmit={handleVerify}
        errors={otpClerkErrors}
      />
      <Form
        className="flex h-full items-center justify-evenly rounded-lg px-6"
        onSubmit={handleSubmit(handleFormSubmit)}
        backgroundColor="$background"
        borderColor="$borderColor"
      >
        <View className="flex justify-center items-center h-28">
          <H4 className="text-5xl">Sign Up</H4>
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
                />
              </View>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <View gap="$2">
                <Text className="text-red-600 text-right mr-2">
                  {errors[name]?.message}
                </Text>
                <Input
                  className="w-full h-14 text-lg"
                  placeholder="Confirm Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
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
            <Button className="text-xl">Create Account</Button>
          </Form.Trigger>
        </View>
        <View className="items-center justify-center" gap="$1">
          <Text className="text-lg">Already have an account?</Text>
          <Link href="/sign-in">
            <Text className="w-full text-sky-600 text-lg">Sign In</Text>
          </Link>
        </View>
        <Separator className="border-2 self-stretch" />
        <OAuthProviders />
      </Form>
    </View>
  );
}
