import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
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
    Alert.alert('Success', 'Food successfully logged.');
    setShowNewFoodForm(false);
    setShowLogOptions(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log Your Meals</Text>

      <FlatList
        data={foodLogs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logText}>{`${item.date} - ${item.mealName}`}</Text>
            <Text style={styles.logSubText}>Calories: {item.calories}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowLogOptions(!showLogOptions)}
      >
        <Text style={styles.buttonText}>Add New Log</Text>
      </TouchableOpacity>

      {showNewFoodForm && (
        <View style={styles.formContainer}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePicker}
          >
            <Text style={styles.dateText}>
              {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
            </Text>
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

          {/* Form Inputs */}
          {['Meal Name', 'Food Items', 'Portion Size', 'Calories'].map(
            (placeholder, idx) => (
              <TextInput
                key={idx}
                style={styles.input}
                placeholder={`${placeholder} *`}
                onChangeText={(val) => {
                  switch (idx) {
                    case 0:
                      return setMealName(val);
                  }
                }}
              />
            )
          )}
        </View>
      )}
    </ScrollView>
  );
}

const Styles =Override
