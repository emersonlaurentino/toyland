import Header from "@/components/navigation/header";
import theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Screen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Novo Produto" canBack />
      <Text>Screen</Text>
    </View>
  );
}
