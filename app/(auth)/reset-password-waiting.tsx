import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Screen() {
  return (
    <View>
      <StatusBar style="dark" />
      <Text>Waiting</Text>
    </View>
  );
}
