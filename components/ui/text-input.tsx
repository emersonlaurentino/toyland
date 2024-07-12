import theme from "@/constants/theme";
import React, { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from "react-native";

export interface TextInputProps extends RNTextInputProps {
  label: string;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <View>
        <Text
          style={{
            fontFamily: "QuicksandBold",
            fontSize: 16,
            marginBottom: theme.spacing.md,
          }}
        >
          {label}
        </Text>
        <RNTextInput
          {...props}
          ref={ref}
          style={{
            fontFamily: "QuicksandBold",
            fontSize: 16,
            height: props.multiline ? 100 : "auto",
            borderWidth: 2,
            borderColor: theme.colors.border,
            padding: theme.spacing.lg,
            borderRadius: theme.spacing.lg,
          }}
        />
      </View>
    );
  }
);

export default TextInput;
