import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialUsers = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
];

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '', general: '' });

  const handleLogin = async () => {
    // Clear previous error messages
    setErrorMessage({ email: '', password: '', general: '' });

    if (!email || !password) {
      setErrorMessage({
        email: !email ? 'Email is required.' : '',
        password: !password ? 'Password is required.' : '',
      });
      return;
    }

    const user = initialUsers.find(user => user.email === email && user.password === password);

    if (user) {
      // Save token and navigate
      await AsyncStorage.setItem('userToken', 'dummy-token');
      navigation.navigate('Main');
    } else {
      setErrorMessage({ general: 'Invalid email or password.' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

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

      {/* General Error Message */}
      {errorMessage.general ? (
        <Text style={styles.generalErrorText}>{errorMessage.general}</Text>
      ) : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign-Up Link */}
      <TouchableOpacity style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don’t have an account? Sign Up</Text>
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
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 10,
  },
  signupText: {
    color: '#007BFF',
    fontSize: 14,
  },
})