import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import { useNewProductStore } from "@/states/new-product";
import * as ExpoImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function NewProduct() {
  const setImages = useNewProductStore((state) => state.setImages);
  const resetImages = useNewProductStore((state) => state.reset);
  const [mediaStatus, mediaRequestPermission] =
    ExpoImagePicker.useMediaLibraryPermissions();

  async function pickImage() {
    if (!mediaStatus?.granted) await mediaRequestPermission();

    resetImages();
    router.push("/(product)/new");

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImages(result.assets);
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
