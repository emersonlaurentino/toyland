import theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  canBack?: boolean;
  action?: ReactNode;
};

export default function Header(props: Props) {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        height: 48,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: theme.spacing.lg,
        position: "relative",
      }}
    >
      {props.canBack ? (
        <Pressable
          onPress={() => router.back()}
          style={{
            height: 48,
            width: 48,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -theme.spacing.lg,
            zIndex: 1,
          }}
        >
          <Ionicons size={24} name="arrow-back" color="#999" />
        </Pressable>
      ) : null}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: props.canBack ? 0 : theme.spacing.lg,
          bottom: 0,
          right: 0,
          justifyContent: "center",
          alignItems: props.canBack ? "center" : "flex-start",
        }}
      >
        <Text style={{ fontFamily: "QuicksandBold", fontSize: 20 }}>
          {props.title}
        </Text>
      </View>
      <View style={{ right: theme.spacing.lg, position: "absolute" }}>
        {props.action ? props.action : null}
      </View>
    </View>
  );
}
