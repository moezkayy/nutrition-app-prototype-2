import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialUsers = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
];

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '', confirmPassword: '', general: '' });

  const handleSignup = async () => {
    // Clear previous error messages
    setErrorMessage({ email: '', password: '', confirmPassword: '', general: '' });

    if (!email || !password || !confirmPassword) {
      setErrorMessage({
        email: !email ? 'Email is required.' : '',
        password: !password ? 'Password is required.' : '',
        confirmPassword: !confirmPassword ? 'Confirm Password is required.' : '',
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage({ confirmPassword: 'Passwords do not match.' });
      return;
    }

    const userExists = initialUsers.find(user => user.email === email);

    if (userExists) {
      setErrorMessage({ email: 'Email already exists.' });
      return;
    }

    const newUser = { email, password };
    initialUsers.push(newUser);

    // Save token and navigate
    await AsyncStorage.setItem('userToken', 'dummy-token');
    Alert.alert('Success', 'Account created successfully.');
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            errorMessage.email ? styles.inputError : null,
          ]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errorMessage.email ? (
          <Text style={styles.errorText}>{errorMessage.email}</Text>
        ) : null}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            errorMessage.password ? styles.inputError : null,
          ]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errorMessage.password ? (
          <Text style={styles.errorText}>{errorMessage.password}</Text>
        ) : null}
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            errorMessage.confirmPassword ? styles.inputError : null,
          ]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {errorMessage.confirmPassword ? (
          <Text style={styles.errorText}>{errorMessage.confirmPassword}</Text>
        ) : null}
      </View>

      {/* General Error Message */}
      {errorMessage.general ? (
        <Text style={styles.generalErrorText}>{errorMessage.general}</Text>
      ) : null}

      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF4D4F',
  },
  errorText: {
    color: '#FF4D4F',
    fontSize: 12,
    marginTop: 5,
  },
  generalErrorText: {
    color: '#FF4D4F',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
  },
  loginText: {
    color: '#007BFF',
    fontSize: 14,
  },
});