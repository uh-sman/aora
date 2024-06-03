import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

 function RootLayout() {
  return (
    <View style={styles.container}>
      <Text>RootLayout</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
