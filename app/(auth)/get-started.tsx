import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import { Stack, router } from "expo-router";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GetStartedScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: theme.spacing.xl,
        paddingBottom: insets.bottom + 20,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/toyland-icon.png")}
          style={{ height: 200, aspectRatio: 1 }}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Button onPress={() => router.push("/sign-up")}>Começar Agora</Button>
        <Button onPress={() => router.push("/sign-in")} variant="secondary">
          Entrar
        </Button>
      </View>
    </View>
  );
}
