import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import theme from "@/constants/theme";
import { authSchema, resetState, useAuthStore } from "@/states/auth";
import { translateAuthErrorMessage } from "@/utils/errors";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const insets = useSafeAreaInsets();
  const loading = useAuthStore((state) => state.loading);
  const signUp = useAuthStore((state) => state.signUp);
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
        paddingTop: insets.top,
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={{
          height: 48,
          width: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons size={24} name="chevron-back" />
      </Pressable>
      <Text
        style={{ margin: theme.spacing.lg, fontSize: 32, fontWeight: "bold" }}
      >
        Criar Conta
      </Text>

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
          placeholder="nome@exemplo.com"
          errorMessage={translateAuthErrorMessage(
            errors.email?.message || apiError?.message
          )}
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
          errorMessage={translateAuthErrorMessage(errors?.password?.message)}
          secureTextEntry
        />
        <Button onPress={handleSubmit(signUp)} loading={loading === "sign-in"}>
          Criar Conta
        </Button>
      </View>
    </View>
  );
}
