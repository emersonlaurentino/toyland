import Header from "@/components/navigation/header";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { type Address } from "@/store/address";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";

function addressToString(address: Address) {
  return `${address.street}, ${address.number}, ${address.complement}, ${address.neighborhood}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`;
}

export default function Screen() {
  const [selected, setSelected] = useState<string | null>(null);
  const { fetchData, data, loading, select, selectLoading } = useBoundStore(
    useShallow((state) => ({
      fetchData: state.fetchAddresses,
      data: state.addresses,
      loading: state.addressesLoading,
      select: state.selectAddress,
      selectLoading: state.selectAddressLoading,
    }))
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Endereços"
        canBack
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
            <Feather size={24} name="plus-circle" color={theme.colors.text} />
          </Pressable>
        }
      />
      {loading && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={24} color={theme.colors.primary} />
        </View>
      )}
      {data.length > 0 && !loading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          style={{ padding: theme.spacing.lg }}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.spacing.lg }} />
          )}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelected(item.id);
                select(item.id);
              }}
              style={{
                padding: theme.spacing.lg,
                borderWidth: 2,
                borderColor: item.main
                  ? theme.colors.primary
                  : theme.colors.border,
                borderRadius: theme.spacing.lg,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: theme.spacing.lg,
                }}
              >
                <Text style={{ fontFamily: "QuicksandBold", fontSize: 20 }}>
                  {item.name}
                </Text>
                {selectLoading && selected === item.id ? (
                  <ActivityIndicator size={24} color={theme.colors.primary} />
                ) : (
                  item.main && (
                    <Ionicons
                      size={24}
                      name="checkmark-circle"
                      color={theme.colors.primary}
                    />
                  )
                )}
              </View>
              <Text
                style={{
                  fontFamily: "QuicksandMedium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                {addressToString(item)}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
