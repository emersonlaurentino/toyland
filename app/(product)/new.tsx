import Header from "@/components/navigation/header";
import Button from "@/components/ui/button";
import theme from "@/constants/theme";
import { useNewProductStore } from "@/states/new-product";
import { Image } from "expo-image";
import React from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
const size = screenWidth * 0.7;

export default function Screen() {
  const images = useNewProductStore((state) => state.images);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header title="Novo Produto" canBack />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <FlatList
          data={images}
          keyExtractor={(item) => item.uri}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            // backgroundColor: theme.colors.foreground,
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
              source={{ uri: item.uri }}
              style={{
                width: size,
                height: size,
                // marginLeft: images.length === 1 ? screenWidth * 0.1 : 0,
                borderRadius: theme.spacing.lg,
              }}
            />
          )}
        />
        <View style={{ padding: theme.spacing.lg, gap: theme.spacing.lg }}>
          <View>
            <Text
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 16,
                marginBottom: theme.spacing.md,
              }}
            >
              Nome
            </Text>
            <TextInput
              placeholder="Digite o nome do produto"
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 16,
                borderWidth: 2,
                borderColor: theme.colors.border,
                padding: theme.spacing.lg,
                borderRadius: theme.spacing.lg,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 16,
                marginBottom: theme.spacing.md,
              }}
            >
              Descrição (Opcional)
            </Text>
            <TextInput
              multiline
              placeholder="Digite a descrição do produto"
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 16,
                height: 100,
                borderWidth: 2,
                borderColor: theme.colors.border,
                padding: theme.spacing.lg,
                borderRadius: theme.spacing.lg,
              }}
            />
          </View>
          <Button>Salvar</Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
