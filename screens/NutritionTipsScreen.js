import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NutritionTipsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Tips Screen</Text>
      <Text>Get your nutrition tips here!</Text>
    </View>
  );
};

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

export default NutritionTipsScreen;