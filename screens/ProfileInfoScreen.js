import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const ProfileInfoScreen = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [targetGoal, setTargetGoal] = useState('');

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
    return bmi ? bmi.toFixed(1) : '---';
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
          placeholder="E.g., Vegetarian, Keto"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Activity Level</Text>
        <TextInput
          style={styles.input}
          value={activityLevel}
          onChangeText={setActivityLevel}
          placeholder="E.g., Sedentary, Active"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Target Goal</Text>
        <TextInput
          style={styles.input}
          value={targetGoal}
          onChangeText={setTargetGoal}
          placeholder="E.g., Weight Loss, Maintenance"
        />
      </View>

      <View style={styles.bmiContainer}>
        <Text style={styles.bmiLabel}>Your BMI:</Text>
        <Text style={styles.bmiValue}>{calculateBMI()}</Text>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
  bmiContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bmiLabel: {
    fontSize: 18,
  },
  bmiValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileInfoScreen;
