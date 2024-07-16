import Header from "@/components/navigation/header";
import DeleteAccount from "@/components/settings/delete-account";
import EditName from "@/components/settings/edit-name";
import ImagePicker from "@/components/settings/image-picker";
import theme from "@/constants/theme";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function Screen() {
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Perfil"
        canBack
        action={
          loading ? (
            <View
              style={{
                height: 48,
                width: 48,
                alignItems: "center",
                justifyContent: "center",
                marginRight: -theme.spacing.lg,
              }}
            >
              <ActivityIndicator color={theme.colors.primary} />
            </View>
          ) : null
        }
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}
          keyboardShouldPersistTaps="handled"
        >
          <ImagePicker setLoading={setLoading} />
          <EditName setLoading={setLoading} />
          <DeleteAccount />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
