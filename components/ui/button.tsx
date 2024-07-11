import theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
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
  variant?: "primary" | "secondary" | "error" | "ghost" | "outline";
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
  ...props
}: ButtonProps) {
  const styleObj = typeof style === "object" ? style : {};

  const styles = {
    container: {
      primary: {
        backgroundColor: theme.colors.primary,
      },
      secondary: {
        backgroundColor: theme.colors.foreground,
      },
      error: {
        backgroundColor: theme.colors.foreground,
      },
      ghost: {
        backgroundColor: "transparent",
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderBottomWidth: 4,
      },
    },
    content: {
      primary: {
        color: theme.colors.white,
      },
      secondary: {
        color: theme.colors.grey1,
      },
      error: {
        color: theme.colors.last,
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
      style={[
        {
          borderRadius: theme.spacing.lg,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: theme.spacing.lg,
          flexDirection: "row",
        },
        styles.container[variant],
        styles.sizes[size],
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
          {icon && <View style={{ width: theme.spacing.sm }} />}
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
