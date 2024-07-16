import Header from "@/components/navigation/header";
import theme from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function Screen() {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Grupos"
        action={
          <Pressable
            style={{
              height: 48,
              width: 48,
              alignItems: "center",
              justifyContent: "center",
              marginRight: -theme.spacing.lg,
            }}
          >
            <Feather size={24} name="plus-circle" color={theme.colors.text} />
          </Pressable>
        }
      />
      <Text>lista de grupos</Text>
    </View>
  );
}
