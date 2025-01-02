import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LogFoodScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Food Screen</Text>
      <Text>Add your food entries here!</Text>
      <Button title="Back to Main" onPress={() => navigation.navigate('Main')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});