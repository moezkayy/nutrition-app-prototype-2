import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProfileContext } from '../context/ProfileContext';
import * as FileSystem from 'expo-file-system';
import * as CSV from 'react-native-csv';
import * as Asset from 'expo-asset';

const csvFilePath = FileSystem.documentDirectory + 'foodLogs.csv';

function LogFoodScreen({ navigation }) {
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
  const [existingFoods, setExistingFoods] = useState([]);
  const [showLogOptions, setShowLogOptions] = useState(false);
  const [showNewFoodForm, setShowNewFoodForm] = useState(false);
  const [showExistingFoodList, setShowExistingFoodList] = useState(false);

  useEffect(() => {
    loadExistingFoods();
  }, []);

  const loadExistingFoods = async () => {
    try {
      const asset = Asset.fromModule(require('../assets/foodEntries.csv'));
      await asset.downloadAsync();
      const fileContent = await FileSystem.readAsStringAsync(asset.localUri);
      const parsedData = CSV.parse(fileContent, { header: true });
      setExistingFoods(parsedData);
    } catch (error) {
      console.log('Error loading existing foods:', error);
    }
  };

  const saveFoodToCSV = async (food) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(csvFilePath);
      const parsedData = CSV.parse(fileContent, { header: true });
      parsedData.push(food);
      const csvData = CSV.stringify(parsedData, { header: true });
      await FileSystem.writeAsStringAsync(csvFilePath, csvData);
    } catch (error) {
      console.log('Error saving food to CSV:', error);
    }
  };

  const validateFields = () => {
    if (!mealName || !foodItems || !portionSize || !calories || !carbs || !proteins || !fats) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const logNewFood = () => {
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
    saveFoodToCSV(newLog);
    Alert.alert('Success', 'Food successfully logged.');
    setShowNewFoodForm(false);
    setShowLogOptions(false);
  };

  const logExistingFood = (food) => {
    const newLog = {
      ...food,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };

    setFoodLogs([...foodLogs, newLog]);
    Alert.alert('Success', 'Food successfully logged.');
    setShowExistingFoodList(false);
    setShowLogOptions(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log Food</Text>

      <FlatList
        data={foodLogs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logText}>{item.date} {item.time} - {item.mealName}</Text>
            <Text style={styles.logText}>Calories: {item.calories}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => setShowLogOptions(!showLogOptions)}>
        <Text style={styles.buttonText}>Log Food</Text>
      </TouchableOpacity>

      {showLogOptions && (
        <View style={styles.logOptions}>
          <TouchableOpacity style={styles.optionButton} onPress={() => { setShowNewFoodForm(true); setShowExistingFoodList(false); }}>
            <Text style={styles.optionButtonText}>Log New Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => { setShowExistingFoodList(true); setShowNewFoodForm(false); }}>
            <Text style={styles.optionButtonText}>Log Existing Food</Text>
          </TouchableOpacity>
        </View>
      )}

      {showNewFoodForm && (
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
            <Text style={styles.dateText}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
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

          <TouchableOpacity style={styles.button} onPress={logNewFood}>
            <Text style={styles.buttonText}>Log Meal</Text>
          </TouchableOpacity>
        </View>
      )}

      {showExistingFoodList && (
        <FlatList
          data={existingFoods}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.logItem} onPress={() => logExistingFood(item)}>
              <Text style={styles.logText}>{item.mealName}</Text>
              <Text style={styles.logText}>Calories: {item.calories}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  formContainer: {
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
});

export default LogFoodScreen;