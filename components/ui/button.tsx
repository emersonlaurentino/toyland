import theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { type ComponentProps } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
  type TextProps,
} from "react-native";

interface ButtonProps
  extends Omit<PressableProps, "children">,
    Pick<TextProps, "children"> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ComponentProps<typeof Ionicons>["name"];
  iconSize?: ComponentProps<typeof Ionicons>["size"];
}

export default function Button({
  loading,
  children,
  variant = "primary",
  size = "md",
  style,
  iconSize,
  icon,
  onPress,
  ...props
}: ButtonProps) {
  const styleObj = typeof style === "object" ? style : {};

  const styles = {
    container: {
      primary: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primaryShade,
        borderBottomWidth: 4,
      },
      secondary: {
        backgroundColor: theme.colors.foreground,
      },
      destructive: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderBottomWidth: 4,
      },
      ghost: {
        backgroundColor: "transparent",
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderBottomWidth: 4,
      },
    },
    content: {
      primary: {
        color: theme.colors.white,
      },
      secondary: {
        color: theme.colors.text,
      },
      destructive: {
        color: theme.colors.destructive,
      },
      ghost: {
        color: theme.colors.primary,
      },
      outline: {
        color: theme.colors.primary,
      },
    },
    sizes: {
      sm: {
        height: 32,
      },
      md: {
        height: 48,
      },
      lg: {
        height: 64,
      },
    },
  };

  return (
    <Pressable
      {...props}
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
      }}
      style={({ pressed }) => [
        {
          borderRadius: theme.spacing.lg,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: theme.spacing.lg,
          flexDirection: "row",
        },
        styles.container[variant],
        styles.sizes[size],
        variant !== "ghost" && pressed && { borderBottomWidth: 2 },
        styleObj,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={styles.content[variant].color} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {icon && (
            <Ionicons
              size={iconSize ?? 20}
              name={icon}
              color={styles.content[variant].color}
            />
          )}
          {icon && children && <View style={{ width: theme.spacing.sm }} />}
          <Text
            style={[
              { fontSize: 16, fontFamily: "QuicksandBold" },
              styles.content[variant],
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
