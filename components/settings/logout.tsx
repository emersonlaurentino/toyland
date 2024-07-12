import Button from "@/components/ui/button";
import useBoundStore from "@/states";
import { Alert } from "react-native";

export default function SettingsLogout() {
  const logout = useBoundStore((state) => state.logout);
  const loading = useBoundStore((state) => state.logoutLoading);

  return (
    <Button
      onPress={() =>
        Alert.alert("Sair da conta", "Tem certeza que deseja sair?", [
          {
            text: "Sair",
            style: "destructive",
            onPress: () => logout(),
          },
          { text: "Cancelar", style: "cancel" },
        ])
      }
      loading={loading}
      variant="outline"
    >
      Sair
    </Button>
  );
}
