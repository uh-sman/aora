import { Text, TouchableOpacity } from "react-native";
interface CustomButtonProps {
  title: string;
  containerStyles: string;
  handlePress: () => void;
  isLoading?: boolean;
  textStyles?: string;
}
const CustomButton = ({
  title,
  containerStyles,
  handlePress,
  isLoading,
  textStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
