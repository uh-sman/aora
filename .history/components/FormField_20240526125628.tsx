import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants/constants"
import CustomButton from "./CustomButton";
import { Link } from "expo-router";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {}
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        { title === "Password"  && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain"/>
            </TouchableOpacity>
        ) }
        <CustomButton title="Sign In"  handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>
        <View className=" justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
        </View>
      </View>
    </View>
  );
};

export default FormField;
