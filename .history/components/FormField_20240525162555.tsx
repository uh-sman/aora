import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
interface FormFieldProps {
  title: string;
  value: any;
  handleChangeText: any;
  otherStyles: string;
  keyboardType?: string;
  placeholder: string;
}
const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        { title === "Password"  }
      </View>
    </View>
  );
};

export default FormField;
