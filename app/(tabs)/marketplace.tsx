import MarketplaceItem from "@/components/marketplace/item";
import Header from "@/components/navigation/header";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { Listing } from "@/store/marketplace";
import { formatDataGrid } from "@/utils/format-data-grid";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

export default function Screen() {
  const address = useBoundStore((state) => state.user?.address);
  const listing = useBoundStore((state) => state.listing);
  const refreshing = useBoundStore((state) => state.fetchMarketplaceRefreshing);
  const fetchMarketplace = useBoundStore((state) => state.fetchMarketplace);
  const loading = useBoundStore((state) => state.fetchMarketplaceLoading);

  useEffect(() => {
    if (address) {
      fetchMarketplace({ neighborhood: address.neighborhood });
    }
  }, [address]);

  if (!address) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Sem endereço</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Marketplace"
        action={
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/settings/addresses",
                params: { screen: "marketplace" },
              })
            }
            style={{
              flexDirection: "row",
              paddingLeft: theme.spacing.lg,
              height: 48,
              alignItems: "center",
              gap: theme.spacing.sm,
            }}
          >
            <Feather name="map-pin" size={20} color={theme.colors.text} />
            <Text style={{ fontFamily: "QuicksandBold", fontSize: 16 }}>
              {address.name}
            </Text>
            <Feather name="chevron-down" size={20} color={theme.colors.text} />
          </Pressable>
        }
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={24} color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          onRefresh={() =>
            fetchMarketplace({ neighborhood: address.neighborhood }, true)
          }
          refreshing={refreshing}
          data={formatDataGrid<Listing>(listing, 2)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={
            listing.length === 0
              ? { flex: 1 }
              : { paddingBottom: theme.spacing.lg }
          }
          columnWrapperStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.lg,
            gap: theme.spacing.lg,
          }}
          renderItem={({ item }) => {
            if (item.empty) return <View style={{ flex: 1 }} />;
            return <MarketplaceItem {...item} />;
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
                Sem produtos para essa localização
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
