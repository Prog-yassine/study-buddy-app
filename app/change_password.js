import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ConfirmeNewPassword, setConfirmeNewPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }}>
                    <Text style={{ color: '#007AFF', fontSize: 16 }}>Save</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Old Password</Text>
                <TextInput
                placeholder="Old Password"
                style={styles.input}
                value={oldPassword}
                onChangeText={setOldPassword}
                autoComplete='password'
                secureTextEntry={true}
                />
                <Text style={styles.label}>New Password</Text>
                <TextInput
                placeholder="New Password"
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                autoComplete='new-password'
                secureTextEntry={true}
                />
                <Text style={styles.label}>Confirm New Password</Text>
                <TextInput
                placeholder="Confirm New Password"
                style={styles.input}
                value={ConfirmeNewPassword}
                onChangeText={setConfirmeNewPassword}
                autoComplete='new-password'
                secureTextEntry={true}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  form: {
    width: '100%',
    padding: 10
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});
