import theme from "@/constants/theme";
import Icon from "@expo/vector-icons/FontAwesome6";
import {
  useController,
  type Control,
  type ControllerProps,
} from "react-hook-form";
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

export interface Props
  extends Omit<
    TextInputProps,
    "onBlur" | "onChangeText" | "style" | "placeholderTextColor"
  > {
  controller: Omit<ControllerProps, "render" | "control"> & {
    control: Control<any>;
  };
  onTransform?: (value: string) => string;
  hideClear?: boolean;
  icon?: string;
  errorMessage?: string;
  label?: string;
}

export default function Input({
  controller,
  onTransform,
  hideClear,
  icon,
  errorMessage,
  label,
  ...props
}: Props) {
  const { field } = useController(controller);
  return (
    <View style={{ gap: theme.spacing.md }}>
      {label && (
        <Text
          style={{ color: theme.colors.grey2, fontWeight: "500", fontSize: 16 }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          backgroundColor: theme.colors.foreground,
          paddingHorizontal: 15,
          borderRadius: 10,
          borderBottomWidth: 0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {icon && (
          <View style={{ marginRight: 15 }}>
            <Icon name={icon} size={20} solid color={theme.colors.grey3} />
          </View>
        )}
        <TextInput
          {...props}
          ref={field.ref}
          onChangeText={field.onChange}
          value={onTransform ? onTransform(field.value) : field.value}
          style={{
            height: 48,
            fontSize: 16,
            flex: 1,
            zIndex: 0.5,
            color: theme.colors.black,
          }}
          placeholderTextColor={theme.colors.grey3}
        />
        {field.value && !hideClear && (
          <Pressable onPress={() => field.onChange("")}>
            <Icon
              name="circle-xmark"
              size={20}
              solid
              color={theme.colors.grey3}
            />
          </Pressable>
        )}
      </View>
      {errorMessage && (
        <Text style={{ color: theme.colors.last }}>{errorMessage}</Text>
      )}
    </View>
  );
}
