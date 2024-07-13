import theme from "@/constants/theme";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingTop: insets.top,
          backgroundColor: theme.colors.background,
        },
      }}
      initialRouteName="settings"
    >
      <Stack.Screen name="settings" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="addresses" />
    </Stack>
  );
}
