import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('screen').height;

import Session from './components/session';

import Sessions_Page from './sessions';
import Mentor_Page from './mentor';

export default function Home({ sessions }) {
  const navigation = useNavigation();
  const [filters, setFilters] = useState(null);
  const [tabs, setTabs] = useState('rooms'); // Default tab is 'rooms'

  useEffect(() => {
    if (filters) {
      console.log('Filters received:', filters);
    }
  }, [filters]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/icon.png')} style={{ width: 45, height: 45, marginRight: 5 }} />
          <Text style={styles.title}>StudyBuddy</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search', { setFilters })} style={{ borderRadius: 100 }}>
          <Ionicons name="search-outline" size={27} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, tabs === 'rooms' && styles.activeTab]}
          onPress={() => setTabs('rooms')}
        >
          <Text style={tabs === 'rooms' ? styles.activeTabText : styles.tabText}>Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tabs === 'mentor' && styles.activeTab]}
          onPress={() => setTabs('mentor')}
        >
          <Text style={tabs === 'mentor' ? styles.activeTabText : styles.tabText}>Mentor</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.ScrollView}>
        {tabs === 'rooms' ? (
          <Sessions_Page sessions={sessions} />
        ) : (
          <Mentor_Page sessions={sessions}/>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    paddingVertical: 10,
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
    fontWeight: '500',
  },
  tabsContainer: {
    width: '100%',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomColor: '#337bff',
    borderBottomWidth: 2,
  },
  tabText: {
    color: 'gray',
  },
  activeTabText: {
    color: '#337bff',
    fontWeight: 'bold',
  },
  ScrollView: {
    height: height - 60,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: '#eee',
  },
});
