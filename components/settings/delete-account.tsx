import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import useBoundStore from "@/states";
import { Alert } from "react-native";

export default function DeleteAccount() {
  const deleteAccount = useBoundStore((state) => state.deleteAccount);
  const loading = useBoundStore((state) => state.deleteAccountLoading);

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
