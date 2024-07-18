import { BASE_URL } from "@/constants/config";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { useState } from "react";
import { Text, TextInput } from "react-native";

type Props = {
  setLoading: (loading: boolean) => void;
};

const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const length = cleaned.length;

  if (length < 3) return cleaned;
  if (length < 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
    7,
    11
  )}`;
};

const removeMask = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, "");
};

export default function EditPhone(props: Props) {
  const user = useBoundStore((state) => state.user);
  const [phone, setPhone] = useState(formatPhoneNumber(user!.phone || ""));
  const token = useBoundStore((state) => state.token);
  const fetchUser = useBoundStore((state) => state.fetchUser);

  const handleChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
  };

  const save = async (value: string) => {
    props.setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "PATCH",
        body: JSON.stringify({ phone: `55${removeMask(value)}` }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await fetchUser("refresh");
      } else {
        console.error("Erro no update:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    } finally {
      props.setLoading(false);
    }
  };

  const handleBlur = () => {
    if (phone && phone !== user?.phone) {
      save(phone);
    }
  };

  const handleSubmitEditing = () => {
    if (phone && phone !== user?.phone) {
      save(phone);
    }
  };

  return (
    <>
      <Text
        style={{
          fontFamily: "QuicksandBold",
          fontSize: 16,
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.md,
        }}
      >
        WhatsApp
      </Text>
      <TextInput
        placeholder="Digite seu número"
        value={phone}
        onChangeText={handleChange}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="done"
        keyboardType="numeric"
        style={{
          fontFamily: "QuicksandBold",
          fontSize: 16,
          borderWidth: 2,
          borderColor: theme.colors.border,
          padding: theme.spacing.lg,
          borderRadius: theme.spacing.lg,
        }}
      />
    </>
  );
}
