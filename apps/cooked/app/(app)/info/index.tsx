import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, H4, Input, View, Text } from "tamagui";
import { Keyboard } from "react-native";
import { useState } from "react";
import { trpc } from "@/utils/trpc/client";
import { useRouter } from "expo-router";

// TODO: Add a profile picture option if time permits.
const extraUserDataSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  username: z.string().min(1).max(255),
});

export default function ExtraUserInfoForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof extraUserDataSchema>>({
    resolver: zodResolver(extraUserDataSchema),
  });

  const [createUserError, setCreateUserError] = useState("");
  const newUserMutation = trpc.newUser.useMutation();
  const router = useRouter();

  const handleFormSubmit = async (
    formData: z.infer<typeof extraUserDataSchema>,
  ) => {
    const { success, message } = await newUserMutation.mutateAsync(formData);

    if (success) {
      router.replace("/(app)/(home)");
    } else {
      setCreateUserError(message);
    }
  };

  return (
    <View
      className="h-screen px-4 py-14 justify-center"
      onPress={() => Keyboard.dismiss()}
    >
      <Form
        className="flex h-full items-center justify-evenly rounded-lg px-6"
        onSubmit={handleSubmit(handleFormSubmit)}
        backgroundColor="$background"
        borderColor="$borderColor"
      >
        <View className="flex justify-center items-center h-48">
          <H4 className="text-4xl mb-6">Additional Information</H4>
          <Text className="text-center text-xl">
            Please enter some additional details about yourself.
          </Text>
        </View>
        <View className="w-full -mb-5" gap="$2">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <View gap="$2">
                <Text className="text-red-600 text-right mr-2">
                  {errors[name]?.message}
                </Text>
                <Input
                  className="w-full h-14 text-lg"
                  placeholder="First Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                />
              </View>
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <View gap="$2">
                <Text className="text-red-600 text-right mr-2">
                  {errors[name]?.message}
                </Text>
                <Input
                  className="w-full h-14 text-lg"
                  placeholder="Last Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                />
              </View>
            )}
          />

          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <View gap="$2">
                <Text className="text-red-600 text-right mr-2">
                  {errors[name]?.message}
                </Text>
                <Input
                  className="w-full h-14 text-lg"
                  placeholder="Display Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                />
              </View>
            )}
          />
        </View>
        <View className="w-full" gap="$2">
          <Text className="text-red-600 text-right">{createUserError}</Text>
          <Form.Trigger asChild className="w-full h-14">
            <Button className="text-xl">Submit</Button>
          </Form.Trigger>
        </View>
      </Form>
    </View>
  );
}