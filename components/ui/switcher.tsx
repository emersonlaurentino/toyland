import theme from "@/constants/theme";
import { Pressable, Text, View } from "react-native";

type Props = {
  data: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
};

export default function Switcher(props: Props) {
  return (
    <View
      style={{
        height: 48,
        flexDirection: "row",
        borderRadius: theme.spacing.lg,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.border,
      }}
    >
      {props.data.map((item) => (
        <Pressable
          key={item.value}
          onPress={() => props.onChange(item.value)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: props.value === item.value ? theme.spacing.lg : 0,
            backgroundColor:
              props.value === item.value
                ? theme.colors.background
                : theme.colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: "QuicksandBold",
              fontSize: 16,
              color:
                props.value === item.value
                  ? theme.colors.primary
                  : theme.colors.black,
            }}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
