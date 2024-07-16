import Header from "@/components/navigation/header";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { registerSchema } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const insets = useSafeAreaInsets();
  const loading = useBoundStore((state) => state.registerLoading);
  const register = useBoundStore((state) => state.register);

  const { control, handleSubmit, setFocus } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />
      <Header title="Criar Conta" canBack />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          padding: theme.spacing.lg,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: theme.spacing.lg }}>
          <InputField
            controller={{
              control,
              name: "name",
              rules: { required: true },
            }}
            label="Nome"
            placeholder="Digite seu nome"
            keyboardType="default"
            onSubmitEditing={() => setFocus("email")}
            returnKeyType="next"
          />
          <InputField
            controller={{
              control,
              name: "email",
              rules: { required: true },
            }}
            label="E-mail"
            placeholder="nome@exemplo.com"
            keyboardType="email-address"
            onSubmitEditing={() => setFocus("password")}
            returnKeyType="next"
            autoCapitalize="none"
          />
          <InputField
            controller={{
              control,
              name: "password",
              rules: { required: true },
            }}
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
          />
          <Button
            onPress={handleSubmit(register)}
            loading={loading}
            style={{ marginTop: theme.spacing.lg }}
          >
            Criar Conta
          </Button>
        </View>
        <Button
          onPress={() => router.push("login")}
          variant="ghost"
          style={{ marginBottom: theme.spacing.lg * 2 }}
        >
          Já tem uma conta? Faça login
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
