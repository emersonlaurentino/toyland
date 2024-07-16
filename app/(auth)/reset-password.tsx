import Header from "@/components/navigation/header";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { resetPasswordSchema } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const loading = useBoundStore((state) => state.resetPasswordLoading);
  const resetPassword = useBoundStore((state) => state.resetPassword);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: String(params.email ?? ""),
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
      <Header title="Esqueceu sua senha?" canBack />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}
        keyboardShouldPersistTaps="handled"
      >
        <InputField
          controller={{
            control,
            name: "email",
            rules: { required: true },
          }}
          label="E-mail"
          autoFocus
          placeholder="nome@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button
          onPress={handleSubmit(resetPassword)}
          loading={loading}
          style={{ marginTop: theme.spacing.lg * 2 }}
        >
          Enviar e-mail de recuperação
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
