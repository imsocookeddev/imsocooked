import { Button, H2, Sheet, Card, Text, View } from "tamagui";
import { useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { Keyboard, StyleSheet } from "react-native";
import type { ClerkAPIError } from "@clerk/types";

interface CodeInputProps {
  onSubmit: (code: string) => void;
  open: boolean;
  errors: ClerkAPIError[] | undefined;
}

const styles = StyleSheet.create({
  pinCodeText: {
    color: "white",
  },
  pinCodeContainer: {
    width: 55,
  },
});

export function CodeInputSheet({ onSubmit, open, errors }: CodeInputProps) {
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <Sheet open={open} modal dismissOnOverlayPress={false}>
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        onPress={() => Keyboard.dismiss()}
      />
      <Sheet.Handle />
      <Sheet.Frame>
        <Card elevate paddingVertical="$6" onPress={() => Keyboard.dismiss()}>
          <Card.Header padded className="items-center mb-6" gap="$3">
            <H2 className="text-3xl">Enter Verification Code</H2>
            <Text className="text-center mb-10">
              Please enter the verification code that was sent to your email
              address.
            </Text>
            <OtpInput
              onTextChange={setVerificationCode}
              theme={{
                pinCodeTextStyle: styles.pinCodeText,
                pinCodeContainerStyle: styles.pinCodeContainer,
              }}
              onFilled={() => Keyboard.dismiss()}
              numberOfDigits={6}
              disabled={!open}
            />
          </Card.Header>
          <Card.Footer padded justifyContent="center">
            <View className="w-full" gap="$4">
              <Text className="text-red-600 text-lg text-center">
                {errors && errors[0]?.longMessage}
              </Text>
              <Button
                className="w-full h-14 text-2xl"
                onPress={() => onSubmit(verificationCode)}
              >
                Submit
              </Button>
            </View>
          </Card.Footer>
        </Card>
      </Sheet.Frame>
    </Sheet>
  );
}
