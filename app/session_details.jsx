import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Profile from './components/profile';
import { useEffect } from 'react';

export default function Session_details() {
  const route = useRoute();
  const navigation = useNavigation();
  const { data } = route.params;
  console.log(data);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Join</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  return (
    <ScrollView style={styles.container}>
      <View style={{width: '100%', padding: 10}}>
        <Text style={{fontSize: 27, fontWeight: 600}}>{data?.subject} : {data?.sub_topic}</Text>
        <View style={{width: '100%', borderRadius: 8}}>
          <Text style={{fontSize: 19, fontWeight: 300, marginVertical: 10}}>{data?.description}</Text>
        </View>
      </View>
      <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 5}}>
        <View style={{width: '47%', borderColor: '#ddd', borderWidth: 1, flexDirection: 'column', borderRadius: 6, padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 7}}>
            <Ionicons name="calendar-outline" size={24} color="gray" style={{paddingLeft: 5}}/>
            <Text style={{paddingLeft: 5, fontWeight: 500, color: 'gray', fontSize: 16}}>Date :</Text>
          </View>
          <Text style={{paddingHorizontal: 5, fontWeight: 600}}>{data?.date}</Text>
        </View>
        <View style={{width: '47%', borderColor: '#ddd', borderWidth: 1, flexDirection: 'column', borderRadius: 6, padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 7}}>
            {data?.session_type === 'group' ? (
              <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="gray" style={{paddingLeft: 5}}/>
            ) : (
              <Ionicons name="videocam-outline" size={24} color="gray" style={{paddingLeft: 5}}/>
            )}
            <Text style={{paddingLeft: 5, fontWeight: 500, color: 'gray', fontSize: 16}}>{data?.session_type === 'group' ? 'Location' : 'Platform'}</Text>
          </View>
          <Text style={{paddingHorizontal: 5, fontWeight: 600}} numberOfLines={1} ellipsizeMode="tail">{data?.location}</Text>
        </View>
      </View>
      <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 5}}>
        <View style={{width: '47%', borderColor: '#ddd', borderWidth: 1, flexDirection: 'column', borderRadius: 6, padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 7}}>
            <FontAwesome5 name="graduation-cap" size={24} color="gray" style={{paddingLeft: 5}}/>
            <Text style={{paddingLeft: 5, fontWeight: 500, color: 'gray', fontSize: 16}}>Level :</Text>
          </View>
          <Text style={{paddingHorizontal: 5, fontWeight: 600}}>{data?.required_level}</Text>
        </View>
        <View style={{width: '47%', borderColor: '#ddd', borderWidth: 1, flexDirection: 'column', borderRadius: 6, padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 7}}>
            <Feather name="users" size={24} color="gray" style={{paddingLeft: 5}}/>
            <Text style={{paddingLeft: 5, fontWeight: 500, color: 'gray', fontSize: 16}}>Max Participant :</Text>
          </View>
          <Text style={{paddingHorizontal: 5, fontWeight: 600}}>{data?.max_members}</Text>
        </View>
      </View>
      <View style={{width: '100%', padding: 10, height: 100, borderTopColor: '#eee', borderTopWidth: 1, marginVertical: 10}}>
        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 500}}>Members :</Text>
          <Text style={{color: '#337bff', fontSize: 17, fontWeight: 700}}>( {data?.members.length} / {data?.max_members} )</Text>
        </View>
        <View style={{width: '100%', marginVertical: 6, flexDirection: 'column'}}>
          {data?.members.map((item, index) => (
            <Profile key={item?.uuid} data={item}/>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
});
