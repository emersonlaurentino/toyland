import theme from "@/constants/theme";
import { ImageProps, Text, View } from "react-native";
import { Image } from "expo-image";

type Props = {
  source: ImageProps["source"];
  alt?: string;
  size?: number;
};

export default function ProfileImage({ size = 72, source, alt }: Props) {
  return !source ? (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1,
        borderColor: theme.colors.border,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {alt}
      </Text>
    </View>
  ) : (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme.colors.foreground,
      }}
    />
  );
}
