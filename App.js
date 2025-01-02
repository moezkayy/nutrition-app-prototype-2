import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileProvider } from './context/ProfileContext';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainScreen from './screens/MainScreen';
import LogFoodScreen from './screens/LogFoodScreen';
import ProfileInfoScreen from './screens/ProfileInfoScreen';
import TrackActivityScreen from './screens/TrackActivityScreen';
import NutritionTipsScreen from './screens/NutritionTipsScreen';
import ProgressReportScreen from './screens/ProgressReportScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Log Food" component={LogFoodScreen} />
          <Stack.Screen name="Profile Info" component={ProfileInfoScreen} />
          <Stack.Screen name="Track Activity" component={TrackActivityScreen} />
          <Stack.Screen name="Nutrition Tips" component={NutritionTipsScreen} />
          <Stack.Screen name="Progress Report" component={ProgressReportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}