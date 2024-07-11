import theme from "@/constants/theme";
import { useAuthStore } from "@/states/auth";
import { useState } from "react";
import { Text, TextInput } from "react-native";

type Props = {
  setLoading: (loading: boolean) => void;
};

export default function EditName(props: Props) {
  const user = useAuthStore((state) => state.user);
  const [name, setName] = useState(user!.name);
  const token = useAuthStore((state) => state.token);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const saveName = async (newName: string) => {
    props.setLoading(true);
    try {
      const response = await fetch("https://api.toylandapp.com/user", {
        method: "PATCH",
        body: JSON.stringify({ name: newName }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await fetchUser();
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
    if (name !== user?.name) {
      saveName(name);
    }
  };

  const handleSubmitEditing = () => {
    if (name !== user?.name) {
      saveName(name);
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
        Nome
      </Text>
      <TextInput
        placeholder="Digite seu nome"
        defaultValue={user?.name}
        onChange={(e) => handleNameChange(e.nativeEvent.text)}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="done"
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
