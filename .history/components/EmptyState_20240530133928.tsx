import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
interface EmptyStateProps {
  title: string;
  subtitle: string;
}
const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[207px] h-[207px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="text-xl text-center  font-psemibold text-white mt-2">{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
