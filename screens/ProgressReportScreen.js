import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProfileContext } from '../context/ProfileContext';

export default function ProgressReportScreen() {
  const { profile, foodLogs, activityLogs } = useContext(ProfileContext);

  const totalCaloriesConsumed = foodLogs.reduce((total, log) => total + parseFloat(log.calories), 0);
  const totalCaloriesBurned = activityLogs.reduce((total, log) => total + parseFloat(log.caloriesBurned), 0);
  const remainingCalories = profile.targetGoal - totalCaloriesConsumed + totalCaloriesBurned;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Progress Report</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <Text style={styles.infoText}>Weight: {profile.weight} kg</Text>
        <Text style={styles.infoText}>Height: {profile.height} cm</Text>
        <Text style={styles.infoText}>Dietary Preference: {profile.dietaryPreference}</Text>
        <Text style={styles.infoText}>Activity Level: {profile.activityLevel}</Text>
        <Text style={styles.infoText}>Goal Type: {profile.goalType}</Text>
        <Text style={styles.infoText}>Goal Amount: {profile.goalAmount} kg</Text>
        <Text style={styles.infoText}>Target Goal: {profile.targetGoal} kcal</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Summary</Text>
        <Text style={styles.infoText}>Calories Consumed: {totalCaloriesConsumed} kcal</Text>
        <Text style={styles.infoText}>Calories Burned: {totalCaloriesBurned} kcal</Text>
        <Text style={styles.infoText}>Remaining Calories: {remainingCalories} kcal</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Food Logs</Text>
        {foodLogs.map((log, index) => (
          <View key={index} style={styles.logItem}>
            <Text style={styles.logText}>{log.date} {log.time} - {log.mealName}</Text>
            <Text style={styles.logText}>Calories: {log.calories}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Logs</Text>
        {activityLogs.map((log, index) => (
          <View key={index} style={styles.logItem}>
            <Text style={styles.logText}>{log.date} {log.time} - {log.activityName}</Text>
            <Text style={styles.logText}>Calories Burned: {log.caloriesBurned}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

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
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  logItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  logText: {
    fontSize: 16,
  },
});

// export default ProgressReportScreen;