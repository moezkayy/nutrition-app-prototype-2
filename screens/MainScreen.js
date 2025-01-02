import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../context/ProfileContext';
import { ProgressBar } from 'react-native-paper';

const MainScreen = () => {
  const navigation = useNavigation();
  const { profile, foodLogs, activityLogs } = useContext(ProfileContext);

  const totalCaloriesConsumed = foodLogs.reduce((total, log) => total + parseFloat(log.calories), 0);
  const totalCaloriesBurned = activityLogs.reduce((total, log) => total + parseFloat(log.caloriesBurned), 0);
  const remainingCalories = profile.targetGoal - totalCaloriesConsumed + totalCaloriesBurned;
  const progress = Math.min(totalCaloriesConsumed / profile.targetGoal, 1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Your Nutrition App</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Daily Progress</Text>
        <ProgressBar progress={progress} color="#007BFF" style={styles.progressBar} />
        <Text style={styles.infoText}>{(progress * 100).toFixed(2)}% of your goal completed</Text>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Log Food')}
      >
        <Text style={styles.cardText}>Log Food</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Profile Info')}
      >
        <Text style={styles.cardText}>Profile Information</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Track Activity')}
      >
        <Text style={styles.cardText}>Track Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Nutrition Tips')}
      >
        <Text style={styles.cardText}>Nutrition Tips</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Progress Report')}
      >
        <Text style={styles.cardText}>Progress Report</Text>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainScreen;