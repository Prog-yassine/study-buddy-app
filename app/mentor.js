import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const height = Dimensions.get('screen').height

import Mentor from './components/mentor';


const data = [
  
]

export default function Mentor_Page({sessions}) {
  const navigation = useNavigation();
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    if (filters) {
      console.log('Filtres reçus :', filters);
    }
  }, [filters]);


  return (

      <ScrollView style={styles.ScrollView}>
        {sessions.map((item, index) => (
          <Mentor key={index} data={item} />
        ))}
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    paddingVertical: 10
  },
  nav: {
    width: '100%',
    height: 60,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
  avatar: {
    width: 35,
    height: 35,
    backgroundColor: "#ddd",
    borderRadius: 100,
  },
  ScrollView: {
  height: height - 60,
  paddingHorizontal: 15,
  paddingVertical: 15,
  backgroundColor: '#eee',
  }
});
