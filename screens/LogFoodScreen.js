import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProfileContext } from '../context/ProfileContext';

export default function LogFoodScreen({ navigation }) {
  const { foodLogs, setFoodLogs } = useContext(ProfileContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mealName, setMealName] = useState('');
  const [foodItems, setFoodItems] = useState('');
  const [portionSize, setPortionSize] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [proteins, setProteins] = useState('');
  const [fats, setFats] = useState('');
  const [preparationMethod, setPreparationMethod] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [mealLocation, setMealLocation] = useState('');
  const [notes, setNotes] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const validateFields = () => {
    if (!mealName || !foodItems || !portionSize || !calories || !carbs || !proteins || !fats) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const logMeal = () => {
    if (!validateFields()) return;

    const newLog = {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      mealName,
      foodItems,
      portionSize,
      calories,
      carbs,
      proteins,
      fats,
      preparationMethod,
      ingredients,
      mealLocation,
      notes,
    };
    setFoodLogs([...foodLogs, newLog]);
    navigation.navigate('Main');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log Food</Text>

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
        placeholder="Meal Name *"
        value={mealName}
        onChangeText={setMealName}
      />
      <TextInput
        style={styles.input}
        placeholder="Food Items *"
        value={foodItems}
        onChangeText={setFoodItems}
      />
      <TextInput
        style={styles.input}
        placeholder="Portion Size *"
        value={portionSize}
        onChangeText={setPortionSize}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories *"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Carbs *"
        value={carbs}
        onChangeText={setCarbs}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Proteins *"
        value={proteins}
        onChangeText={setProteins}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fats *"
        value={fats}
        onChangeText={setFats}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Preparation Method"
        value={preparationMethod}
        onChangeText={setPreparationMethod}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        style={styles.input}
        placeholder="Meal Location"
        value={mealLocation}
        onChangeText={setMealLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.button} onPress={logMeal}>
        <Text style={styles.buttonText}>Log Meal</Text>
      </TouchableOpacity>

      <View style={styles.logsContainer}>
        <Text style={styles.logsTitle}>Logged Meals</Text>
        {foodLogs.map((log, index) => (
          <View key={index} style={styles.logItem}>
            <Text style={styles.logText}>{log.date} {log.time} - {log.mealName}</Text>
            <Text style={styles.logText}>Calories: {log.calories}</Text>
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