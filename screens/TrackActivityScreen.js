import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProfileContext } from '../context/ProfileContext';

export default function TrackActivityScreen({ navigation }) {
  const { activityLogs, setActivityLogs } = useContext(ProfileContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const validateFields = () => {
    if (!activityName || !duration || !caloriesBurned) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const logActivity = () => {
    if (!validateFields()) return;

    const newLog = {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      activityName,
      duration,
      caloriesBurned,
      notes,
    };
    setActivityLogs([...activityLogs, newLog]);
    navigation.navigate('Main');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Track Activity</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Activity Name *"
        value={activityName}
        onChangeText={setActivityName}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (minutes) *"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Calories Burned *"
        value={caloriesBurned}
        onChangeText={setCaloriesBurned}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.button} onPress={logActivity}>
        <Text style={styles.buttonText}>Log Activity</Text>
      </TouchableOpacity>

      <View style={styles.logsContainer}>
        <Text style={styles.logsTitle}>Logged Activities</Text>
        {activityLogs.map((log, index) => (
          <View key={index} style={styles.logItem}>
            <Text style={styles.logText}>{log.date} {log.time} - {log.activityName}</Text>
            <Text style={styles.logText}>Duration: {log.duration} minutes</Text>
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
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
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
  logsContainer: {
    marginTop: 20,
  },
  logsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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