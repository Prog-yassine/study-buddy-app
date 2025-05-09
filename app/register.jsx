import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './supabase'; // Ensure you have Supabase configured in your project

export default function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!fullname || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullname,
        },
      },
    });

    if (error) {
      Alert.alert('Registration Failed', error.message);
    } else {
      Alert.alert('Success', 'Your account has been created!');
      navigation.navigate('Login'); // Navigate to the Login page after successful registration
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }} style={{ backgroundColor: '#fff' }}>
        <View style={styles.header}>
          <Image source={require('../assets/icon.png')} style={{ width: 100, height: 100 }} />
          <Text style={styles.title}>Welcome Student 👋🏻</Text>
          <View style={styles.subtitle}>
            <Text style={{ fontSize: 14, color: '#555' }}>Please enter your details </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={{ fontSize: 18, fontWeight: 300, paddingVertical: 5 }}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={fullname}
            onChangeText={setFullname}
          />
          <Text style={{ fontSize: 18, fontWeight: 300, paddingVertical: 5 }}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={{ fontSize: 18, fontWeight: 300, paddingVertical: 5 }}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={{ fontSize: 18, fontWeight: 300, paddingVertical: 5 }}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', marginVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Already have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 0,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});