import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const predefinedLocations = [
    {
      id: 1,
      title: 'Café La Fontaine',
      latitude: 30.4161346,
      longitude: -9.5957258,
      description: 'A quiet café in the city center known for its relaxed ambiance, suitable for study sessions with coffee and snacks.'
    },
    {
      id: 2,
      title: 'Olhao Garden',
      latitude: 30.4246544,
      longitude: -9.5973064,
      description: 'A peaceful public park with shaded benches and greenery, perfect for outdoor group revisions on sunny days.'
    },
    {
      id: 3,
      title: 'Universiapolis Library',
      latitude: 30.404446,
      longitude: -9.529586,
      description: 'A well-equipped academic library offering quiet zones, group study rooms, and free Wi-Fi for students.'
    },
    {
      id: 4,
      title: 'Universiapolis Cafeteria',
      latitude: 30.403877,
      longitude: -9.529290,
      description: 'A spacious university cafeteria with indoor and outdoor seating, ideal for collaborative study over meals.'
    },
];

const screenWidth = Dimensions.get('window').width;

export default function Pick_Location({ navigation, route }) {
  const [location, setLocation] = useState(predefinedLocations[2]);

  const mapRef = useRef(null);
  const setPosition = route.params.setPosition({
    id: location.id,
    title: location.title,
    description: location.description,
    latitude: location.latitude,
    longitude: location.longitude,
  });
  

  const applyLocation = () => {
    if (setPosition) {
      const { id, title, description, latitude, longitude } = location;
      setPosition({ id, title, description, latitude, longitude });
    }
    navigation.goBack();
  };
  

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={applyLocation} style={{ marginRight: 15 }}>
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Apply</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLocationSelect = (loc) => {
    setLocation({
      ...loc,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    mapRef.current?.animateToRegion({
      ...loc,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 300);
  };
  

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={location}
      >
        <Marker coordinate={location} title="Selected" />
      </MapView>

      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {predefinedLocations.map((loc) => (
            <View key={loc.id} >
                <TouchableOpacity
                    style={styles.locationCard}
                    onPress={() => handleLocationSelect(loc)}
                >
                    <View style={{backgroundColor: '#fff', width: '100%', height: '100%', padding: 10, borderRadius: 9, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5}}>
                        <Text style={styles.locationTitle}>{loc.title}</Text>
                        <Text style={styles.coordinates}>
                            {loc.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      height: 140,
    },
    scrollContent: {
      alignItems: 'center',
    },
    locationCard: {
      width: screenWidth,
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    locationTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 6,
    },
    coordinates: {
      fontSize: 14,
      color: '#777',
    },
});
  