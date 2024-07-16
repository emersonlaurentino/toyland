import Header from "@/components/navigation/header";
import SettingsLogout from "@/components/settings/logout";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { Pressable, SectionList, Text, View } from "react-native";

const handleEmail = (email: string) => {
  const subject = "Fazer comentários";
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  Linking.openURL(url).catch((err) =>
    console.error("Erro ao abrir o email:", err)
  );
};

export default function Screen() {
  const user = useBoundStore((state) => state.user);

  const DATA = [
    {
      title: "Conta",
      data: [
        { title: "Perfil", onAction: () => router.push("/(settings)/profile") },
        {
          title: "Endereços",
          onAction: () => router.push("/(settings)/addresses"),
        },
      ],
    },
    {
      title: "Suporte",
      data: [
        {
          title: "Central de Ajuda",
          onAction: () =>
            Linking.openURL("https://chat.whatsapp.com/CgoEHMMKbfbGMLuf18T2aj"),
        },
        {
          title: "Fazer comentários",
          onAction: () => (user?.email ? handleEmail(user.email) : null),
        },
      ],
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header title="Configurações" canBack />
      <SectionList
        sections={DATA}
        style={{ padding: theme.spacing.lg }}
        keyExtractor={(item) => item.title}
        stickySectionHeadersEnabled={false}
        renderItem={({ item, index, section }) => (
          <Pressable
            onPress={item.onAction}
            style={{
              borderWidth: 2,
              borderBottomWidth: index === section.data.length - 1 ? 2 : 0,
              borderColor: theme.colors.border,
              borderTopEndRadius: index === 0 ? theme.spacing.lg : 0,
              borderTopStartRadius: index === 0 ? theme.spacing.lg : 0,
              borderBottomEndRadius:
                index === section.data.length - 1 ? theme.spacing.lg : 0,
              borderBottomStartRadius:
                index === section.data.length - 1 ? theme.spacing.lg : 0,
              padding: theme.spacing.lg,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 16,
              }}
            >
              {item.title}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              style={{ marginRight: -theme.spacing.sm }}
              color={theme.colors.border}
            />
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontFamily: "QuicksandBold",
              fontSize: 16,
              marginVertical: theme.spacing.lg,
            }}
          >
            {title}
          </Text>
        )}
        ListFooterComponent={
          <View>
            <SettingsLogout />
            {/* <View style={{ marginTop: theme.spacing.lg }}>
              <Text
                style={{
                  fontFamily: "QuicksandBold",
                  fontSize: 16,
                  color: theme.colors.primary,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Termos de Uso
              </Text>
              <Text
                style={{
                  fontFamily: "QuicksandBold",
                  fontSize: 16,
                  color: theme.colors.primary,
                  marginTop: theme.spacing.sm,
                }}
              >
                Política de Privacidade
              </Text>
            </View> */}
          </View>
        }
        ListFooterComponentStyle={{ marginTop: theme.spacing.lg }}
      />
    </View>
  );
}
