import Button from "@/components/ui/button";
import { useAuthStore } from "@/states/auth";
import { Alert } from "react-native";

export default function ProfileSignOut() {
  const signOut = useAuthStore((state) => state.signOut);
  const loading = useAuthStore((state) => state.loading);

  return (
    <Button
      onPress={() =>
        Alert.alert("Sair da conta", "Tem certeza que deseja sair sua conta?", [
          {
            text: "Sair",
            style: "destructive",
            onPress: () => signOut(),
          },
          { text: "Cancelar", style: "cancel" },
        ])
      }
      loading={loading === "sign-out"}
      variant="error"
    >
      Sair
    </Button>
  );
}
