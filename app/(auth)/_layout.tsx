import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="get-started"
        options={{ headerShown: false, title: "Toyland" }}
      />
      <Stack.Screen name="sign-in" options={{ title: "Insira seus dados" }} />
      <Stack.Screen name="sign-up" options={{ title: "Insira seus dados" }} />
    </Stack>
  );
}
