import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import CustomButton from "./CustomButton";
import { Link, router, usePathname } from "expo-router";
interface SearchInputProps {
  placeholder?: string;
  title?: string;
  value?: any;
  handleChangeText?: any;
  otherStyles?: string;
  keyboardType?: string;
  initialQuery?: any;
}
const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  initialQuery
}: SearchInputProps) => {
  const pathnname = usePathname()
  const [query, setQuery] = useState("")
  console.log({query})
  return (
    <View className="w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity onPress={() => {
        if (!query) {
          return Alert.alert("Missing query", "Please input something to search on aora")
        }

        if (pathnname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        
      }}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
