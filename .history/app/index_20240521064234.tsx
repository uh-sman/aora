import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { Link } from 'expo-router'; 
export default function App() {
  return (
    <View className='justify-center items-center text-red-300'>
      <Text>Hello Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{ color: "blue" }}>Go to Profile</Link>
    </View>
  );
}

