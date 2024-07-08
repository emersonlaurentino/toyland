import theme from "@/constants/theme";
import {
  ActivityIndicator,
  Pressable,
  Text,
  type PressableProps,
  type TextProps,
} from "react-native";

interface ButtonProps
  extends Omit<PressableProps, "children">,
    Pick<TextProps, "children"> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "error" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  loading,
  children,
  variant = "primary",
  size = "md",
  style,
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
        color: theme.colors.black,
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
        },
        styles.container[variant],
        styles.sizes[size],
        styleObj,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={styles.content[variant].color} />
      ) : (
        <Text
          style={[{ fontSize: 16, fontWeight: "500" }, styles.content[variant]]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
