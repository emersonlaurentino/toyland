import theme from "@/constants/theme";
import { useAuthStore } from "@/states/auth";
import { Feather } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.foreground,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          flexDirection: "row",
          height: 48,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "relative",
            paddingHorizontal: theme.spacing.lg,
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.lg,
          }}
        >
          {!user?.imageUrl ? (
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: theme.colors.white,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.colors.grey3,
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {user?.name.charAt(0)}
              </Text>
            </View>
          ) : (
            <Image
              source={{
                uri: `https://assets.toylandapp.com/${user?.imageUrl}`,
              }}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: theme.colors.foreground,
              }}
            />
          )}
          <Text style={{ fontSize: 32, fontFamily: "Itim" }}>
            {user?.name
              ? user?.name.length > 19
                ? user?.name.slice(0, 19) + "..."
                : user?.name
              : "Perfil"}
          </Text>
        </View>
        <Pressable
          // onPress={() => router.back()}
          style={{
            height: 48,
            width: 48,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 3,
          }}
        >
          <Feather size={24} name="settings" />
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.white,
          margin: theme.spacing.lg,
          borderRadius: theme.spacing.lg,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          borderWidth: 4,
          borderColor: theme.colors.white,
          padding: theme.spacing.lg,
          shadowRadius: 4,
        }}
      >
        <Text>Brinqudos</Text>
      </View>
    </ScrollView>
  );
}
