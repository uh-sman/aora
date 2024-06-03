import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { Link } from 'expo-router'; 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-orange-500 text-3xl'>Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/profile" className='text-blue-400'>Go to Profile</Link>
    </View>
  );
}
