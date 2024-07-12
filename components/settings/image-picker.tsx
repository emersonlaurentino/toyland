import ProfileImage from "@/components/settings/profile-image";
import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import useBoundStore from "@/states";
import * as ExpoImagePicker from "expo-image-picker";
import { useState } from "react";
import { View } from "react-native";

type Props = {
  setLoading: (loading: boolean) => void;
};

export default function ImagePicker(props: Props) {
  const user = useBoundStore((state) => state.user);
  const token = useBoundStore((state) => state.token);
  const fetchUser = useBoundStore((state) => state.fetchUser);
  const [image, setImage] = useState<ExpoImagePicker.ImagePickerAsset>();
  const [mediaStatus, mediaRequestPermission] =
    ExpoImagePicker.useMediaLibraryPermissions();

  async function pickImage() {
    if (!mediaStatus?.granted) await mediaRequestPermission();
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }

    try {
      props.setLoading(true);
      const image = result.assets?.[0];

      if (image) {
        const formData = new FormData();

        formData.append("file", {
          uri: image?.uri,
          name: `image.${image?.uri.split(".").pop()}`,
          type: `image/${image?.uri.split(".").pop()}`,
        } as any);

        const response = await fetch("https://api.toylandapp.com/user/image", {
          method: "PUT",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          await fetchUser();
        } else {
          console.error("Erro no upload:", response.statusText);
        }
      }
    } catch (error) {
      console.log("Error uploading", error);
    } finally {
      props.setLoading(false);
    }
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing.sm,
      }}
    >
      <ProfileImage
        size={96}
        source={
          image
            ? { uri: image.uri }
            : user?.imageUrl
            ? { uri: `https://assets.toylandapp.com/${user?.imageUrl}` }
            : undefined
        }
        alt={user?.name.charAt(0)}
      />
      <Button variant="ghost" onPress={pickImage}>
        Mudar Foto
      </Button>
    </View>
  );
}
