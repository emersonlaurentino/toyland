import Button from "@/components/ui/button";
import useBoundStore from "@/store";
import { Alert } from "react-native";

type Props = {
  id: string;
};

export default function DeleteProduct(props: Props) {
  const deleteProduct = useBoundStore((state) => state.deleteProduct);
  const loading = useBoundStore((state) => state.deleteProductLoading);

  return (
    <Button
      onPress={() =>
        Alert.alert("Apagar", "Tem certeza que deseja apagar o produto?", [
          {
            text: "Apagar",
            style: "destructive",
            onPress: () => deleteProduct(props.id),
          },
          { text: "Cancelar", style: "cancel" },
        ])
      }
      loading={loading}
      variant="destructive"
    >
      Apagar
    </Button>
  );
}
