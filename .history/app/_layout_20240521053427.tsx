import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Slot } from "expo-router";

function RootLayout() {
  return (
    <>
      <Text>Header</Text>
      <Slot />
      <Text>Footer</Text>
    </>
  );
}

export default RootLayout;
