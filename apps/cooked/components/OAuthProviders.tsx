import * as WebBrowser from "expo-web-browser";
import { Text, View, Button } from "tamagui";
import type { ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { useOAuth } from "@clerk/clerk-expo";
import { useBrowserWarmUp } from "@/hooks/useBrowser";
import { useCallback } from "react";
import * as Linking from "expo-linking";
import { useAssets } from "expo-asset";
import Discord from "../assets/images/discord.svg";
import Google from "../assets/images/google.svg";
import Apple from "../assets/images/apple.svg";

WebBrowser.maybeCompleteAuthSession();

const oAuthOptions = ["google", "discord", "apple"] as const;
const oAuthLogos = [
  <Google fill="#fff" width={20} />,
  <Discord fill="#fff" width={30} />,
  <Apple fill="#fff" width={23} />,
] as const;

export function OAuthProviders() {
  useBrowserWarmUp();

  const flows = oAuthOptions.map((option) => {
    return useOAuth({ strategy: `oauth_${option}` });
  });

  const onPress = useCallback(
    (flow: (typeof flows)[number]) => async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await flow.startOAuthFlow({
            redirectUrl: Linking.createURL("/(app)/(home)", {
              scheme: "myapp",
            }),
          });

        if (createdSessionId) {
          setActive!({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    },
    [],
  );

  return (
    <View className="flex-row" gap="$8">
      {flows.map((flow, idx) => {
        return (
          <Button key={idx} onPress={onPress(flow)} className="w-12">
            <Button.Icon>{oAuthLogos[idx]}</Button.Icon>
          </Button>
        );
      })}
    </View>
  );
}
