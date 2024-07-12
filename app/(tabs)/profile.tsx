import Header from "@/components/navigation/header";
import ProductItem from "@/components/product-item";
import NewProduct from "@/components/product/button-new";
import ProfileImage from "@/components/settings/profile-image";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { formatDataGrid } from "@/utils/format-data-grid";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

type TabItemProps = {
  title: string;
  count?: string;
  selected?: boolean;
  onPress?: () => void;
};

function TabItem({ title, count, selected, onPress }: TabItemProps) {
  const selectedStyle = selected
    ? {
        borderBottomWidth: 3,
        borderBottomColor: theme.colors.primary,
      }
    : {
        paddingBottom: theme.spacing.md + 1,
        borderBottomWidth: 2,
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
  const user = useBoundStore((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("inventory");
  const fetchUser = useBoundStore((state) => state.fetchUser);
  const userLoading = useBoundStore((state) => state.userLoading);

  const tabs = Object.keys(user?.products || {}).map((key) => ({
    id: key,
    title: TABS[key],
    count: String((user?.products as any)[key].length),
  }));

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Perfil"
        action={
          <Pressable
            onPress={() => router.push("/(settings)/settings")}
            style={{
              height: 48,
              width: 48,
              alignItems: "center",
              justifyContent: "center",
              marginRight: -theme.spacing.lg,
            }}
          >
            <Feather size={24} name="settings" color="#999" />
          </Pressable>
        }
      />
      <FlatList
        onRefresh={fetchUser}
        refreshing={userLoading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.lg,
                padding: theme.spacing.lg,
              }}
            >
              <ProfileImage
                source={
                  user?.imageUrl
                    ? { uri: `https://assets.toylandapp.com/${user?.imageUrl}` }
                    : undefined
                }
                alt={user?.name.charAt(0)}
              />
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

            <NewProduct />

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
            : { paddingBottom: theme.spacing.lg }
        }
        columnWrapperStyle={{
          paddingHorizontal: theme.spacing.lg,
          // paddingVertical: theme.spacing.lg,
          paddingTop: theme.spacing.lg,
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
    </View>
  );
}
