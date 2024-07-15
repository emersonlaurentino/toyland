import Header from "@/components/navigation/header";
import Button from "@/components/ui/button";
import Switcher from "@/components/ui/switcher";
import TextInput from "@/components/ui/text-input";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { type Address } from "@/store/address";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

function addressToString(address: Address) {
  return `${address.street}, ${address.number}`;
}

export default function Screen() {
  const params = useLocalSearchParams();
  const [selected, setSelected] = useState<string>("donation");
  const [price, setPrice] = useState<string>("");
  const address = useBoundStore((state) => state.user?.address);

  function handleChange(value: string) {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = (Number(numericValue) / 100).toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    );

    setPrice(formattedValue);
  }

  console.log(params.productId, selected, price.replace(/[^0-9]/g, ""));

  if (!address) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Sem endereço</Text>
      </View>
    );
  }

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
          <View>
            <Text
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 16,
                marginBottom: theme.spacing.md,
              }}
            >
              Endereço de Retirada
            </Text>

            <Pressable
              // onPress={item.onAction}
              style={{
                borderWidth: 2,
                borderColor: theme.colors.border,
                borderRadius: theme.spacing.lg,
                paddingHorizontal: theme.spacing.lg,
                height: 48,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "QuicksandBold", fontSize: 16 }}>
                {addressToString(address)}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                style={{ marginRight: -theme.spacing.sm }}
                color={theme.colors.border}
              />
            </Pressable>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "QuicksandBold",
                fontSize: 16,
                marginBottom: theme.spacing.md,
              }}
            >
              Tipo de Anúncio
            </Text>
            <Switcher
              value={selected}
              onChange={(v) => {
                setSelected(v);
                setPrice("");
              }}
              data={[
                { label: "Doação", value: "donation" },
                { label: "Venda", value: "sale" },
              ]}
            />
          </View>
          {selected === "sale" && (
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
