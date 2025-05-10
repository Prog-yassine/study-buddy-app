import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, KeyboardAvoidingView, TouchableOpacity, Switch } from 'react-native';
import {Ionicons, AntDesign} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Search({ navigation, route }) {
    const [searchTerm, setSearchTerm] = useState('');
    const setFilters = route.params?.setFilters;
    const [Startdate, setStartDate] = useState(new Date());
    const [ShowDatePicker, setShowDatePicker] = useState(false);
    const [OnlineSession, setOnlineSession] = useState(false);
    const [Required_level, setRequired_level] = useState('All');
    const [max_participants, setMax_participants] = useState(5);
    
    const applyFilters = () => {
        if (setFilters) {
            setFilters({ searchTerm, Startdate });
        }
        navigation.goBack();
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setStartDate(currentDate);
    };

    const AddParticipants = () => {
        if(max_participants < 15){
            setMax_participants(max_participants + 1)
        }else{
            alert('Cant add more participants')
        }
    }

    const RemoveParticipants = () => {
        if(max_participants > 2){
            setMax_participants(max_participants - 1)
        }else{
            alert('Cant remove more participants')
        }
    }

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={applyFilters} style={{ marginRight: 15 }}>
              <Text style={{ color: '#007AFF', fontSize: 16 }}>Apply</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation]);


    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchView}>
                <TextInput style={styles.input} placeholder="Entrez un mot-clé..." value={searchTerm} onChangeText={setSearchTerm}/>
                <View style={styles.searchIcon}>
                    <Ionicons name="search-outline" size={24} color="black" />
                </View>
            </View>
            <View style={{paddingVertical: 20}}>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 18, fontWeight: 500}}>Online Event :</Text>
                    <Switch value={OnlineSession} onChange={() => setOnlineSession(!OnlineSession)}/>
                </View>
            </View>
            <View style={{paddingVertical: 20}}>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 18, fontWeight: 500}}>Max Participants :</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderColor: '#000', borderWidth: 1, borderRadius: 8, height: 39}}>
                        <TouchableOpacity style={{paddingHorizontal: 9}} onPress={RemoveParticipants}>
                            <AntDesign name="minus" size={20} color="black" />
                        </TouchableOpacity>
                        <Text style={{borderLeftColor: '#000', borderLeftWidth: 1, borderRightColor: '#000', borderRightWidth: 1, paddingHorizontal: 10}}>{max_participants}</Text>
                        <TouchableOpacity style={{paddingHorizontal: 9}} onPress={AddParticipants}>
                            <AntDesign name="plus" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{paddingVertical: 10}}>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 18, fontWeight: 500}}>Required Level :</Text>
                </View>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10}}>
                    <TouchableOpacity onPress={() => setRequired_level('All')} style={Required_level === 'All' ? {paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#000', borderRadius: 5, borderColor: '#000', borderWidth: 1} : {paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#fff', borderRadius: 5, borderColor: '#000', borderWidth: 1}}>
                        <Text style={Required_level === 'All' ? {color: '#fff'} : {color: '#000'}}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRequired_level('Beginner')} style={Required_level === 'Beginner' ? {paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#337bff', borderRadius: 5, borderColor: '#337bff', borderWidth: 1} : {paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#fff', borderRadius: 5, borderColor: '#000', borderWidth: 1}}>
                        <Text style={Required_level === 'Beginner' ? {color: '#fff'} : {color: '#000'}}>Beginner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRequired_level('Intermediate')} style={Required_level === 'Intermediate' ? {paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#fa9500', borderRadius: 5, borderColor: '#fa9500', borderWidth: 1} : {paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#fff', borderRadius: 5, borderColor: '#000', borderWidth: 1}}>
                        <Text style={Required_level === 'Intermediate' ? {color: '#fff'} : {color: '#000'}}>Intermediate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRequired_level('Advanced')} style={Required_level === 'Advanced' ? {paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#e71d36', borderRadius: 5, borderColor: '#e71d36', borderWidth: 1} : {paddingHorizontal: 15, paddingVertical: 7, backgroundColor: '#fff', borderRadius: 5, borderColor: '#000', borderWidth: 1}}>
                        <Text style={Required_level === 'Advanced' ? {color: '#fff'} : {color: '#000'}}>Advanced</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{paddingVertical: 10}}>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 18, fontWeight: 500}}>Show Date Picker :</Text>
                    <Switch value={ShowDatePicker} onValueChange={() => setShowDatePicker(!ShowDatePicker)}/>
                </View>
                {ShowDatePicker === true &&
                    <View style={styles.content}>
                        <DateTimePicker value={Startdate} mode='date' onChange={onChange} display="inline" />
                    </View>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 10
  },
  searchView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 10
  },
  searchIcon: {
    width: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 50,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 5,
    marginVertical: 10
  }
});
