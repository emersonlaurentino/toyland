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
}

export default function Button({
  loading,
  children,
  variant = "primary",
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
        color: theme.colors.primary,
      },
    },
  };

  return (
    <Pressable
      {...props}
      style={[
        {
          borderRadius: 10,
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: theme.spacing.lg,
        },
        styles.container[variant],
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
