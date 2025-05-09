import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { supabase } from './supabase';
const Profile = () => {
  const navigation = useNavigation();
   
  const Bolt = () => {
    Alert.alert(
      'Bolt',
      'The Bolt Score is your personal impact meter that reflects how active, reliable, and supportive you are as a study partner. After each completed session, members can leave a ⚡Bolt for each other to recognize focus, collaboration, or just good vibes.'
    )
  }

  return (
    <SafeAreaView style={{backgroundColor: '#eee'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{width: '100%', backgroundColor: '#fff', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, marginVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={{width: 50, height: 50, borderRadius: 1000}}/>
            <View style={{flexDirection: 'column', marginLeft: 7}}>
              <Text style={{fontSize: 16, fontWeight: 600}}>Yassine Aboutaib</Text>
              <Text style={{fontSize: 15, fontWeight: 300}}>yassineaboutaib@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity onPress={Bolt} style={{ paddingHorizontal: 15, paddingVertical: 7, borderRadius: 100, borderColor: '#007AFF', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: '#007AFF', marginRight: 3}}>31k</Text>
            <MaterialIcons name="bolt" size={19} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', backgroundColor: '#fff', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, marginVertical: 10}}>
          <TouchableOpacity onPress={()=> navigation.navigate('Fav')} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20, fontWeight: 600}}>Personalize your profile</Text>
              <Text style={{fontSize: 15, fontWeight: 300}}>Tell us more about you to help you find what you want.</Text>
              <View style={{backgroundColor: '#eee', width: '90%', height: 10, marginTop: 10, borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{height: '100%', backgroundColor: '#007AFF', flex: 1, borderTopLeftRadius: 100, borderBottomLeftRadius: 100}}></View>
                <View style={{height: '100%', flex: 1}}></View>
                <View style={{height: '100%', flex: 1, borderTopRightRadius: 100, borderBottomRightRadius: 100}}></View>
              </View>
            </View>
            <Image style={{width: 90, height: 90}} source={require('../assets/image.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#fff', width: '100%', padding: 10, borderRadius: 10, marginVertical: 10}}>
          <Text style={{color: 'gray', fontSize: 17}}>Setting :</Text>
          <View style={{width: '100%'}}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20}} onPress={() => navigation.navigate('Edite_Profile')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather name="edit-3" size={24} color="black" />
                <Text style={{marginLeft: 7, fontSize: 15}}>Edite Profile</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20}} onPress={() => navigation.navigate('Notification')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="notifications-outline" size={24} color="black" />
                <Text style={{marginLeft: 7, fontSize: 15}}>Notification</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="security" size={26} color="black" />
                <Text style={{marginLeft: 7, fontSize: 15}}>Privacy Setting</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20}} onPress={() => navigation.navigate('Change_Password')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="eye-outline" size={24} color="black" />
                <Text style={{marginLeft: 7, fontSize: 15}}>Change Password</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20}} onPress={() => supabase.auth.signOut()}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="logout" size={24} color="red" />
                <Text style={{marginLeft: 7, fontSize: 15, color: 'red'}}>Logout</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#eee',
    height: '100%',
  },
});

export default Profile;
