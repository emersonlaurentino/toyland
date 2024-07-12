import React from "react";
import { Control, ControllerProps, useController } from "react-hook-form";
import TextInput, { TextInputProps } from "./text-input";

interface Props extends Omit<TextInputProps, "onChangeText" | "value"> {
  controller: Omit<ControllerProps, "render" | "control"> & {
    control: Control<any>;
  };
}

export default function InputField({ controller, ...props }: Props) {
  const { field } = useController(controller);

  return (
    <TextInput
      {...props}
      ref={field.ref}
      onChangeText={field.onChange}
      value={field.value}
    />
  );
}
