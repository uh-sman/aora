import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/constants";
import FormField from "../../components/FormField";

const SignUP = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  return (
    <SafeAreaView className="bg-primary min-h-[83vh]">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10 text-semibold">
            Sign Up to Aora
          </Text>
        </View>
        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e: any) => setForm({ ...form, username: e })}
          otherStyles="mt-10"
          placeholder=""
        />
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e: any) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
          placeholder=""
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e: any) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
          placeholder=""
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUP;
