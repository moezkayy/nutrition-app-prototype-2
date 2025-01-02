import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ProfileContext } from '../context/ProfileContext';

const ProfileInfoScreen = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [weight, setWeight] = useState(profile.weight);
  const [height, setHeight] = useState(profile.height);
  const [dietaryPreference, setDietaryPreference] = useState(profile.dietaryPreference);
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel);
  const [goalType, setGoalType] = useState(profile.goalType || 'Weight Loss');
  const [goalAmount, setGoalAmount] = useState(profile.goalAmount || '');

  const saveProfile = () => {
    if (!weight || !height || !dietaryPreference || !activityLevel || !goalAmount) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setProfile({
      weight,
      height,
      dietaryPreference,
      activityLevel,
      goalType,
      goalAmount,
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
        <Text style={styles.label}>Goal Type</Text>
        <Picker
          selectedValue={goalType}
          style={styles.picker}
          onValueChange={(itemValue) => setGoalType(itemValue)}
        >
          <Picker.Item label="Weight Loss" value="Weight Loss" />
          <Picker.Item label="Weight Gain" value="Weight Gain" />
          <Picker.Item label="Maintain Weight" value="Maintain Weight" />
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Goal Amount (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={goalAmount}
          onChangeText={setGoalAmount}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  picker: {
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