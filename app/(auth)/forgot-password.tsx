import AuthHeader from "@/components/auth/header";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import theme from "@/constants/theme";
import { forgotSchema, resetState, useAuthStore } from "@/states/auth";
import { translateAuthErrorMessage } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const loading = useAuthStore((state) => state.loading);
  const forgot = useAuthStore((state) => state.forgot);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: String(params.email ?? ""),
    },
  });

  useEffect(() => {
    resetState();
  }, []);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <AuthHeader title="Esqueceu sua senha?" />

      <View
        style={{
          gap: theme.spacing.lg,
          paddingTop: theme.spacing.lg,
          paddingHorizontal: theme.spacing.lg,
        }}
      >
        <Input
          controller={{
            control,
            name: "email",
            rules: { required: true },
          }}
          label="E-mail"
          autoFocus
          placeholder="nome@exemplo.com"
          errorMessage={translateAuthErrorMessage(errors.email?.message ?? "")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button onPress={handleSubmit(forgot)} loading={loading === "forgot"}>
          Enviar e-mail de recuperação
        </Button>
      </View>
    </View>
  );
}
