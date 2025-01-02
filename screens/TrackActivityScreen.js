import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProfileContext } from '../context/ProfileContext';

const TrackActivityScreen = () => {
  const { profile } = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Activity Screen</Text>
      <Text>Weight: {profile.weight} kg</Text>
      <Text>Height: {profile.height} cm</Text>
      <Text>Dietary Preference: {profile.dietaryPreference}</Text>
      <Text>Activity Level: {profile.activityLevel}</Text>
      <Text>Target Goal: {profile.targetGoal}</Text>
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

export default TrackActivityScreen;