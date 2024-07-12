import Header from "@/components/navigation/header";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
const size = screenWidth * 0.7;

export default function Screen() {
  const { productId, name } = useLocalSearchParams();
  const fetchProduct = useBoundStore((state) => state.fetchProduct);
  const product = useBoundStore((state) =>
    state.products.find((p) => p.id === productId)
  );

  useEffect(() => {
    if (productId) {
      fetchProduct(String(productId));
    }
  }, [productId]);

  return (
    <View>
      <Header title={String(name)} canBack />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <FlatList
          data={product?.images}
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
        {product && (
          <View style={{ padding: theme.spacing.lg }}>
            <Text>{productId}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
