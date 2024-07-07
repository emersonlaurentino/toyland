import AuthHeader from "@/components/auth/header";
import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <AuthHeader title="E-mail enviado" />

      <View
        style={{
          paddingHorizontal: theme.spacing.lg,
          gap: theme.spacing.xl,
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Enviamos um e-mail com as instruções para redefinir sua senha.
        </Text>
        <Button onPress={() => router.back()} variant="secondary">
          Voltar para o login
        </Button>
      </View>
    </View>
  );
}
