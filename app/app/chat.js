import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import GroupeSession from './components/session_groupe';

export default function Chat() {
  const [selected, setSelected] = useState('All');

  const filters = ['All', 'Unseen', 'Favorit'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color="#ddd" />
          <TextInput
            placeholder='Search for Session'
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {filters.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setSelected(item)}
                style={[
                  styles.filterButton,
                  selected === item && styles.activeFilterButton
                ]}
              >
                <Text style={[styles.filterText, selected === item && styles.activeFilterText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <GroupeSession />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height: '100%',
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  scrollView: {
    width: '100%',
    height: '100%',
    padding: 10
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
  },
  card: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 7,
    backgroundColor: '#fff',
  },
  activeFilterButton: {
    backgroundColor: '#000',
  },
  filterText: {
    color: '#000',
  },
  activeFilterText: {
    color: '#fff',
  },
});
