import MarketplaceItem from "@/components/marketplace/item";
import Header from "@/components/navigation/header";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { type Address } from "@/store/address";
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

function addressToString(address: Address) {
  return `${address.street}, ${address.number}`;
}

export default function Screen() {
  const address = useBoundStore((state) => state.user?.address);
  const listing = useBoundStore((state) => state.listing);
  const fetchListing = useBoundStore((state) => state.fetchListing);
  const loading = useBoundStore((state) => state.listingLoading);

  useEffect(() => {
    if (address) {
      fetchListing(address.neighborhood);
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
        title="Desapega"
        action={
          <Pressable
            // onPress={() => router.push("/(settings)/settings")}
            style={{
              height: 48,
              width: 48,
              alignItems: "center",
              justifyContent: "center",
              marginRight: -theme.spacing.lg,
            }}
          >
            <Feather size={24} name="search" color={theme.colors.text} />
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
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/(settings)/addresses",
                    params: { screen: "marketplace" },
                  })
                }
                style={{
                  flexDirection: "row",
                  paddingHorizontal: theme.spacing.lg,
                  height: 48,
                  alignItems: "center",
                  gap: theme.spacing.sm,
                  flex: 1,
                }}
              >
                <Text
                  style={{ fontFamily: "QuicksandMedium", fontSize: 16 }}
                  numberOfLines={1}
                >
                  {addressToString(address)}
                </Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={theme.colors.text}
                />
              </Pressable>
              {/* <Pressable
                style={{
                  height: 48,
                  width: 48,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="filter" size={24} color={theme.colors.text} />
              </Pressable> */}
            </View>
          )}
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
