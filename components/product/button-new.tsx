import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import * as ExpoImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function NewProduct() {
  const setNewProductImages = useBoundStore(
    (state) => state.setNewProductImages
  );
  const resetNewProduct = useBoundStore((state) => state.resetNewProduct);
  const [mediaStatus, mediaRequestPermission] =
    ExpoImagePicker.useMediaLibraryPermissions();

  async function pickImage() {
    if (!mediaStatus?.granted) await mediaRequestPermission();

    resetNewProduct();
    router.push("/(product)/new");

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setNewProductImages(result.assets);
    } else {
      router.back();
    }
  }

  return (
    <Button
      style={{ margin: theme.spacing.lg, marginTop: 0 }}
      variant="outline"
      onPress={pickImage}
    >
      Novo Produto
    </Button>
  );
}
