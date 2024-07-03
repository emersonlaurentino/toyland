import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import theme from "@/constants/theme";
import { authSchema, resetState, useAuthStore } from "@/states/auth";
import { translateAuthErrorMessage } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function Page() {
  const loading = useAuthStore((state) => state.loading);
  const signIn = useAuthStore((state) => state.signIn);
  const apiError = useAuthStore((state) => state.error);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
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
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.xl,
      }}
    >
      <View style={{ gap: theme.spacing.lg }}>
        <Input
          controller={{
            control,
            name: "email",
            rules: { required: true },
          }}
          placeholder="E-mail"
          errorMessage={translateAuthErrorMessage(errors.email?.message ?? "")}
          keyboardType="email-address"
          onSubmitEditing={() => setFocus("password")}
          returnKeyType="next"
          autoCapitalize="none"
        />
        <Input
          controller={{
            control,
            name: "password",
            rules: { required: true },
          }}
          placeholder="Senha"
          errorMessage={translateAuthErrorMessage(
            errors?.password?.message || apiError?.message
          )}
          secureTextEntry
        />
      </View>
      <Button
        onPress={handleSubmit(signIn)}
        loading={loading === "sign-in"}
        style={{ marginTop: theme.spacing.xl }}
      >
        Entrar
      </Button>
    </View>
  );
}
