import Header from "@/components/navigation/header";
import { Text, View } from "react-native";

export default function Screen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Desapegar" canBack />
      <Text>form</Text>
    </View>
  );
}
