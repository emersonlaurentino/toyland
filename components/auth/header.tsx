import theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";

interface Props {
  title: string;
}

export default function AuthHeader(props: Props) {
  return (
    <>
      <StatusBar style="dark" />
      <Pressable
        onPress={() => router.back()}
        style={{
          height: 48,
          width: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons size={24} name="chevron-back" />
      </Pressable>
      <Text
        style={{
          margin: theme.spacing.lg,
          fontSize: 32,
          fontFamily: "QuicksandBold",
        }}
      >
        {props.title}
      </Text>
    </>
  );
}
