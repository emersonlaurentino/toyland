import Header from "@/components/navigation/header";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import theme from "@/constants/theme";
import useBoundStore from "@/states";
import { createProductSchema } from "@/states/new-product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
const size = screenWidth * 0.7;

export default function Screen() {
  const newProductImages = useBoundStore((state) => state.newProductImages);
  const newProductLoading = useBoundStore((state) => state.newProductLoading);
  const createProduct = useBoundStore((state) => state.createProduct);
  const token = useBoundStore((state) => state.token);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      token: String(token),
    },
  });

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
          data={newProductImages}
          keyExtractor={(item) => item.uri}
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
              source={{ uri: item.uri }}
              style={{
                width: size,
                height: size,
                borderRadius: theme.spacing.lg,
              }}
            />
          )}
        />
        <View style={{ padding: theme.spacing.lg, gap: theme.spacing.lg }}>
          <InputField
            label="Nome"
            placeholder="Digite o nome do produto"
            controller={{
              control,
              name: "name",
              rules: { required: true },
            }}
          />
          <InputField
            multiline
            label="Descrição (Opcional)"
            placeholder="Digite a descrição do produto"
            controller={{
              control,
              name: "description",
            }}
          />
          <Button
            onPress={handleSubmit(createProduct)}
            loading={newProductLoading}
          >
            Salvar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
