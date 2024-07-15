import Header from "@/components/navigation/header";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Screen() {
  const params = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Anuncio" canBack />
      <Text>{params.id}</Text>
    </View>
  );
}
