import Header from "@/components/navigation/header";
import ProfileImage from "@/components/settings/profile-image";
import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
const size = screenWidth * 0.7;

const types: { [key: string]: string } = {
  sale: "Venda",
  donation: "Doação",
};

const openAddressInMaps = (address: string) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

export default function Screen() {
  const { id, type } = useLocalSearchParams();
  const user = useBoundStore((state) => state.user);
  const fetchListing = useBoundStore((state) => state.fetchListing);
  const loading = useBoundStore((state) => state.fetchListingLoading);
  const listing = useBoundStore((state) =>
    state.listing.find((l) => l.id === id)
  );
  useEffect(() => {
    if (id) {
      fetchListing({ id: String(id) });
    }
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Anúncio${type ? ` de ${types[String(type)]}` : ""}`}
        canBack
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={24} color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: theme.spacing.lg * 3,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <FlatList
            data={listing?.product.images}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              height: size + theme.spacing.lg * 2,
              maxHeight: size + theme.spacing.lg * 2,
              paddingVertical: theme.spacing.lg,
              paddingLeft: screenWidth * 0.15,
            }}
            ListFooterComponent={() => (
              <View style={{ width: screenWidth * 0.15 * 2 }} />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ width: theme.spacing.lg }} />
            )}
            renderItem={({ item }) => (
              <Image
                source={{ uri: `https://assets.toylandapp.com/${item}` }}
                style={{
                  width: size,
                  height: size,
                  borderRadius: theme.spacing.lg,
                  backgroundColor: theme.colors.foreground,
                }}
              />
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  width: size,
                  height: size,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={24} color={theme.colors.primary} />
              </View>
            )}
          />
          <View style={{ padding: theme.spacing.lg, paddingBottom: 0 }}>
            {listing?.type === "sale" && (
              <Text
                style={{
                  fontFamily: "QuicksandBold",
                  fontSize: 32,
                  marginBottom: theme.spacing.lg,
                }}
              >
                {(Number(listing?.price) / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            )}
            <Text
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 24,
                marginBottom: theme.spacing.lg,
              }}
            >
              {listing?.product.name}
            </Text>
            <Button
              style={{ marginVertical: theme.spacing.lg }}
              onPress={() => Linking.openURL(`https://wa.me/${user?.phone}`)}
            >
              Mandar Mensagem
            </Button>
            {listing?.product.description && (
              <>
                <Text
                  style={{
                    fontFamily: "QuicksandBold",
                    fontSize: 16,
                    marginTop: theme.spacing.lg,
                    marginBottom: theme.spacing.md,
                  }}
                >
                  Descrição
                </Text>
                <Text
                  style={{
                    fontFamily: "QuicksandMedium",
                    fontSize: 16,
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.text,
                  }}
                >
                  {listing.product.description}
                </Text>
              </>
            )}
            <Pressable onPress={() => openAddressInMaps(listing!.address)}>
              <Text
                style={{
                  fontFamily: "QuicksandBold",
                  fontSize: 16,
                  marginBottom: theme.spacing.md,
                }}
              >
                Endereço de Retirada
              </Text>
              <Text
                style={{
                  fontFamily: "QuicksandMedium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                {listing?.address}
              </Text>
            </Pressable>
            <Text
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 16,
                marginTop: theme.spacing.lg,
                marginBottom: theme.spacing.md,
              }}
            >
              Anunciado por
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.md,
              }}
            >
              <ProfileImage
                source={
                  listing?.owner.imageUrl
                    ? {
                        uri: `https://assets.toylandapp.com/${listing.owner.imageUrl}`,
                      }
                    : undefined
                }
                alt={listing?.owner.name.charAt(0)}
                size={32}
              />
              <Text
                style={{
                  fontFamily: "QuicksandMedium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                {listing?.owner.name}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
