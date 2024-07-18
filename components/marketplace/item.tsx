import { productStatus } from "@/constants/product-status";
import theme from "@/constants/theme";
import { Listing } from "@/store/marketplace";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

function MarketplaceItem(listing: Listing) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/marketplace/[id]",
          params: { id: listing.id, type: listing.type },
        })
      }
      style={{
        flex: 1,
        padding: theme.spacing.sm,
        borderRadius: theme.spacing.lg,
        borderWidth: 2,
        borderColor: theme.colors.border,
      }}
    >
      <View style={{ position: "relative" }}>
        <View
          style={{
            position: "absolute",
            top: theme.spacing.sm,
            left: theme.spacing.sm,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.sm,
            borderRadius: theme.spacing.sm,
            zIndex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "QuicksandMedium",
              fontSize: 14,
              color: theme.colors.white,
            }}
          >
            {productStatus[listing.product.status]}
          </Text>
        </View>
        {listing.product.images.length > 0 ? (
          <Image
            source={{
              uri: `https://assets.toylandapp.com/${listing.product.images[0]}`,
            }}
            style={{
              flex: 1,
              aspectRatio: 1,
              borderRadius: theme.spacing.md,
              backgroundColor: theme.colors.foreground,
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              aspectRatio: 1,
              borderRadius: theme.spacing.md,
              backgroundColor: theme.colors.foreground,
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
              {listing.product.name.charAt(0)}
            </Text>
          </View>
        )}
      </View>
      <View style={{ padding: theme.spacing.md, gap: theme.spacing.sm }}>
        {listing.type === "sale" && (
          <Text
            style={{
              fontFamily: "QuicksandBold",
              fontSize: 16,
            }}
          >
            {(listing.price / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        )}
        <Text
          style={{
            fontFamily: "QuicksandMedium",
            fontSize: 16,
          }}
          numberOfLines={2}
        >
          {listing.product.name}
        </Text>
        {listing.product.description ? (
          <Text
            style={{
              fontFamily: "QuicksandMedium",
              fontSize: 16,
              color: theme.colors.text,
            }}
            numberOfLines={2}
          >
            {listing.product.description}
          </Text>
        ) : null}
        <Text
          style={{
            fontFamily: "QuicksandMedium",
            fontSize: 14,
            color: theme.colors.text,
          }}
          numberOfLines={3}
        >
          {listing.address}
        </Text>
      </View>
    </Pressable>
  );
}

export default MarketplaceItem;
