import theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  canBack?: boolean;
  onAction?: () => void;
  actionIcon?: ComponentProps<typeof Ionicons>["name"];
  actionColor?: string;
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
          }}
        >
          <Ionicons size={24} name="arrow-back" color="#999" />
        </Pressable>
      ) : null}
      <Text
        style={{
          fontFamily: "QuicksandBold",
          fontSize: 20,
        }}
      >
        {props.title}
      </Text>
      {props.onAction ? (
        <Pressable
          onPress={props.onAction}
          style={{
            height: 48,
            width: 48,
            alignItems: "center",
            justifyContent: "center",
            marginRight: -theme.spacing.lg,
          }}
        >
          <Ionicons
            size={24}
            name={props.actionIcon}
            color={props.actionColor}
          />
        </Pressable>
      ) : (
        <View style={{ width: 48, marginRight: -theme.spacing.lg }} />
      )}
    </View>
  );
}
