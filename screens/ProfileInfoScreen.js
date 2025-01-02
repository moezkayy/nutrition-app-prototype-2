import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ProfileContext } from '../context/ProfileContext';

const ProfileInfoScreen = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [weight, setWeight] = useState(profile.weight);
  const [height, setHeight] = useState(profile.height);
  const [dietaryPreference, setDietaryPreference] = useState(profile.dietaryPreference);
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel);
  const [targetGoal, setTargetGoal] = useState(profile.targetGoal);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
    return bmi ? bmi.toFixed(1) : '---';
  };

  const saveProfile = () => {
    setProfile({
      weight,
      height,
      dietaryPreference,
      activityLevel,
      targetGoal,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile Information</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Dietary Preference</Text>
        <TextInput
          style={styles.input}
          value={dietaryPreference}
          onChangeText={setDietaryPreference}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Activity Level</Text>
        <TextInput
          style={styles.input}
          value={activityLevel}
          onChangeText={setActivityLevel}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Target Goal</Text>
        <TextInput
          style={styles.input}
          value={targetGoal}
          onChangeText={setTargetGoal}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileInfoScreen;