import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import { useAuthStore } from "@/states/auth";
import { Alert } from "react-native";

export default function DeleteAccount() {
  const deleteAccount = useAuthStore((state) => state.deleteAccount);
  const loading = useAuthStore((state) => state.loading === "delete-account");

  return (
    <Button
      onPress={() =>
        Alert.alert("Excluir Conta", "Tem certeza que deseja excluir?", [
          {
            text: "Excluir",
            style: "destructive",
            onPress: () => deleteAccount(),
          },
          { text: "Cancelar", style: "cancel" },
        ])
      }
      loading={loading}
      style={{ marginTop: theme.spacing.lg * 2 }}
      variant="destructive"
    >
      Excluir Conta
    </Button>
  );
}
