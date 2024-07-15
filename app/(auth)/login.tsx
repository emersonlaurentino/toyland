import Header from "@/components/navigation/header";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { loginWithPasswordSchema } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const insets = useSafeAreaInsets();
  const loading = useBoundStore((state) => state.loginWithPasswordLoading);
  const loginWithPassword = useBoundStore((state) => state.loginWithPassword);

  const { control, handleSubmit, setFocus, getValues } = useForm({
    resolver: zodResolver(loginWithPasswordSchema),
    defaultValues: {
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
      <Header title="Entrar" canBack />
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
            onPress={handleSubmit(loginWithPassword)}
            loading={loading}
            style={{ marginTop: theme.spacing.lg }}
          >
            Entrar
          </Button>
          <Button
            onPress={() =>
              router.push({
                pathname: "reset-password",
                params: {
                  email: getValues("email"),
                },
              })
            }
            variant="ghost"
          >
            Esqueceu sua senha?
          </Button>
        </View>
        <Button
          onPress={() => router.push("register")}
          variant="ghost"
          style={{ marginBottom: theme.spacing.lg * 2 }}
        >
          Você não tem uma conta?
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
