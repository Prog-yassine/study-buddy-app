import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Edite_Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

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
                <Text style={styles.label}>First Name</Text>
                <TextInput
                placeholder="Enter your first"
                style={styles.input}
                value={name}
                onChangeText={setName}
                />

                <Text style={styles.label}>Last Name</Text>
                <TextInput
                placeholder="Enter your last name"
                style={styles.input}
                value={name}
                onChangeText={setName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                />

                <Text style={styles.label}>Bio</Text>
                <TextInput
                placeholder="Write something about you"
                style={[styles.input, styles.textArea]}
                value={bio}
                onChangeText={setBio}
                multiline={true}
                numberOfLines={5}
                maxLength={150}
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
