import Header from "@/components/navigation/header";
import ProductItem from "@/components/product-item";
import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import { useAuthStore } from "@/states/auth";
import { formatDataGrid } from "@/utils/format-data-grid";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

type TabItemProps = {
  title: string;
  count?: string;
  selected?: boolean;
  onPress?: () => void;
};

function TabItem({ title, count, selected, onPress }: TabItemProps) {
  const selectedStyle = selected
    ? {
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
      }
    : {
        paddingBottom: theme.spacing.md + 1,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      };

  return (
    <Pressable
      style={{
        flexDirection: "row",
        gap: theme.spacing.sm,
        alignItems: "center",
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        ...selectedStyle,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: "QuicksandBold",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      {count ? (
        <View
          style={{
            backgroundColor: theme.colors.border,
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.sm,
            borderRadius: theme.spacing.sm,
          }}
        >
          <Text style={{ fontFamily: "QuicksandBold", fontSize: 16 }}>
            {count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const TABS: { [key: string]: string } = {
  inventory: "Inventário",
  givingAway: "Desapegando",
  history: "Histórico",
};

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("inventory");

  const tabs = Object.keys(user?.products || {}).map((key) => ({
    id: key,
    title: TABS[key],
    count: String((user?.products as any)[key].length),
  }));

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Header
            title="Perfil"
            actionColor="#999"
            actionIcon="settings"
            onAction={() => {}}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.lg,
              padding: theme.spacing.lg,
            }}
          >
            {!user?.imageUrl ? (
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
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
                  {user?.name.charAt(0)}
                </Text>
              </View>
            ) : (
              <Image
                source={{
                  uri: `https://assets.toylandapp.com/${user?.imageUrl}`,
                }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: theme.colors.foreground,
                }}
              />
            )}
            <Text
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 24,
                flex: 1,
              }}
              numberOfLines={2}
            >
              {user?.name}
            </Text>
          </View>

          <Button
            style={{ margin: theme.spacing.lg, marginTop: 0 }}
            variant="outline"
            icon="add-circle"
            iconSize={24}
            onPress={() => router.push("/(product)/new")}
          >
            Novo Produto
          </Button>

          <FlatList
            contentContainerStyle={{ paddingHorizontal: theme.spacing.lg }}
            data={tabs}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <TabItem
                title={item.title}
                count={item.count}
                selected={selectedTab === item.id}
                onPress={() => setSelectedTab(item.id)}
              />
            )}
          />
        </View>
      }
      data={formatDataGrid((user?.products as any)[selectedTab], 2)}
      numColumns={2}
      contentContainerStyle={
        tabs.find((item) => item.id === selectedTab)?.count === "0"
          ? { flex: 1 }
          : {}
      }
      columnWrapperStyle={{
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
        gap: theme.spacing.lg,
      }}
      renderItem={({ item }) => {
        if (item.empty) return <View style={{ flex: 1 }} />;
        return <ProductItem {...item} />;
      }}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing.lg,
          }}
        >
          <Text
            style={{
              fontFamily: "QuicksandBold",
              fontSize: 16,
              color: theme.colors.grey3,
            }}
          >
            {`Nenhum produto ${
              selectedTab === "givingAway" ? "para desapegar" : ""
            }`}
          </Text>
        </View>
      }
      keyExtractor={(item) => item.id}
    />
  );
}
