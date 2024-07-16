import Header from "@/components/navigation/header";
import ProductItem from "@/components/product-item";
import NewProduct from "@/components/product/button-new";
import ProfileImage from "@/components/settings/profile-image";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { Product } from "@/store/product";
import { formatDataGrid } from "@/utils/format-data-grid";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Screen() {
  const user = useBoundStore((state) => state.user);
  const fetchUser = useBoundStore((state) => state.fetchUser);
  const userLoading = useBoundStore((state) => state.userLoading);

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
            <Feather size={24} name="settings" color={theme.colors.text} />
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
          </View>
        }
        data={formatDataGrid<Product>(user?.products as any, 2)}
        numColumns={2}
        contentContainerStyle={
          user?.products.length === 0
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
                color: theme.colors.text,
              }}
            >
              Nenhum Produto Cadastrado
            </Text>
          </View>
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
