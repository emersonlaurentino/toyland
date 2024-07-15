import Header from "@/components/navigation/header";
import Button from "@/components/ui/button";
import Switcher from "@/components/ui/switcher";
import TextInput from "@/components/ui/text-input";
import theme from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function Screen() {
  const params = useLocalSearchParams();
  const [selected, setSelected] = useState<string>("donation");
  const [price, setPrice] = useState<string>("");

  function handleChange(value: string) {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = (Number(numericValue) / 100).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );

    setPrice(formattedValue);
  }

  console.log(params.productId, selected, price.replace(/[^0-9]/g, ""));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header title="Desapegar" canBack />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: theme.spacing.lg }}>
          <Switcher
            value={selected}
            onChange={(v) => {
              setSelected(v);
              setPrice("");
            }}
            data={[
              { label: "Doar", value: "donation" },
              { label: "Vender", value: "sell" },
            ]}
          />
          {selected === "sell" && (
            <TextInput
              label="Preço"
              placeholder="R$"
              keyboardType="number-pad"
              onChangeText={handleChange}
              value={price}
              autoFocus
            />
          )}
        </View>
        <Button style={{ marginTop: theme.spacing.lg * 2 }}>Anunciar</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
