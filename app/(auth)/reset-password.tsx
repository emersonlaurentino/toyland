import AuthHeader from "@/components/auth/header";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import theme from "@/constants/theme";
import useBoundStore from "@/states";
import { resetPasswordSchema } from "@/states/auth-slice";
import { translateAuthErrorMessage } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const loading = useBoundStore((state) => state.resetPasswordLoading);
  const resetPassword = useBoundStore((state) => state.resetPassword);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: String(params.email ?? ""),
    },
  });

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
        <Button onPress={handleSubmit(resetPassword)} loading={loading}>
          Enviar e-mail de recuperação
        </Button>
      </View>
    </View>
  );
}
