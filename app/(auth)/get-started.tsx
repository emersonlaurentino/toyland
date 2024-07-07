import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GetStartedScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require("../../assets/images/get-started.jpg")}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: insets.bottom + theme.spacing.lg,
        paddingTop: insets.top + theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
      }}
    >
      <StatusBar style="light" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/images/toyland-logo.png")}
          style={{
            height: 96,
            width: 160,
          }}
        />
        {/* <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: theme.colors.white,
          }}
        >
          Toyland
        </Text> */}
      </View>
      <View>
        <View
          style={{
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Button onPress={() => router.push("/register")}>Começar Agora</Button>
          <Button onPress={() => router.push("/login")} variant="secondary">
            Entrar
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
