import Button from "@/components/ui/button";
import { useAuthStore } from "@/states/auth";
import { Alert } from "react-native";

export default function ProfileLogout() {
  const logout = useAuthStore((state) => state.logout);
  const loading = useAuthStore((state) => state.loading === "logout");

  return (
    <Button
      onPress={() =>
        Alert.alert("Sair da conta", "Tem certeza que deseja sair sua conta?", [
          {
            text: "Sair",
            style: "destructive",
            onPress: () => logout(),
          },
          { text: "Cancelar", style: "cancel" },
        ])
      }
      loading={loading}
      variant="error"
    >
      Sair
    </Button>
  );
}
