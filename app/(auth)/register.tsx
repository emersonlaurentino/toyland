import AuthHeader from "@/components/auth/header";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import theme from "@/constants/theme";
import useBoundStore from "@/states";
import { registerSchema } from "@/states/auth";
import { translateAuthErrorMessage } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const insets = useSafeAreaInsets();
  const loading = useBoundStore((state) => state.registerLoading);
  const register = useBoundStore((state) => state.register);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <AuthHeader title="Criar Conta" />

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
                name: "name",
                rules: { required: true },
              }}
              label="Nome"
              placeholder="Digite seu nome"
              errorMessage={translateAuthErrorMessage(errors.name?.message)}
              keyboardType="default"
              onSubmitEditing={() => setFocus("email")}
              returnKeyType="next"
            />
            <Input
              controller={{
                control,
                name: "email",
                rules: { required: true },
              }}
              label="E-mail"
              placeholder="nome@exemplo.com"
              errorMessage={translateAuthErrorMessage(errors.email?.message)}
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
              label="Senha"
              placeholder="Digite sua senha"
              errorMessage={translateAuthErrorMessage(
                errors?.password?.message
              )}
              secureTextEntry
            />
            <Button onPress={handleSubmit(register)} loading={loading}>
              Criar Conta
            </Button>
          </View>
        </View>
        <Button onPress={() => router.push("login")} variant="ghost">
          Já tem uma conta? Faça login
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
