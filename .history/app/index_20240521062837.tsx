import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { Link } from 'expo-router'; 
export default function App() {
  return (
    <View>
      <Text className="flex-col justify-center items-center">Hello Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{ color: "blue" }}>Go to Profile</Link>
    </View>
  );
}

