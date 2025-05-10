import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Switch, Alert, SafeAreaView } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function Create_session() {
    const [subject, setSubject] = useState('');
    const [sub_topic, setSubTopic] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [onlineSession, setOnlineSession] = useState(false);
    const [requiredLevel, setRequiredLevel] = useState('All');
    const [maxParticipants, setMaxParticipants] = useState(5);
    const [meetingLink, setMeetingLink] = useState('');
    const [selectedPlace, setSelectedPlace] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [estimatedDuration, setEstimatedDuration] = useState(0);
    const [endTime, setEndTime] = useState(new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), startTime.getMinutes() + estimatedDuration));
    const navigation = useNavigation();

    const [location, setLocation] = useState({
      description: "A well-equipped academic library offering quiet zones, group study rooms, and free Wi-Fi for students.", 
      id: 3, 
      latitude: 30.404446, 
      longitude: -9.529586, 
      title: "Universiapolis Library"
    });

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
    };

    const addParticipant = () => {
        if (maxParticipants < 15) {
            setMaxParticipants(maxParticipants + 1);
        } else {
            Alert.alert('Limit Reached', 'Cannot add more than 15 participants.');
        }
    };

    const removeParticipant = () => {
        if (maxParticipants > 2) {
            setMaxParticipants(maxParticipants - 1);
        } else {
            Alert.alert('Minimum Limit', 'At least 2 participants required.');
        }
    };

    const createSession = () => {
      if (!subject.trim() || !sub_topic.trim()) {
        Alert.alert('Missing Information', 'Please enter a session subject and Sub Topic.');
        return;
      }

    
      const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const durationStr = `${Math.floor(duration / 60)}h ${duration % 60}m`;

      const day = String(startDate.getDate()).padStart(2, '0');
      const month = String(startDate.getMonth() + 1).padStart(2, '0');
      const year = startDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      
      const FinalData = {
        subject: subject,
        sub_topic: sub_topic,
        description: description,
        max_members: maxParticipants,
        start_time: formattedStartTime + ':00',
        end_time: formattedEndTime + ':00',
        status: 'Open',
        required_level: requiredLevel,
        location: onlineSession ? meetingLink : location?.title,
        date: formattedDate,
        session_type: onlineSession ? 'online' : 'in-person',
        estimated_duration: durationStr
      };

      navigation.goBack();
    };
    


    return (
      <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
        <View style={{width: '100%', height: 60, borderBottomColor: '#ddd', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10}}>
          <Text style={{color: '#000', fontSize: 23, fontWeight: 600}}>Create Session</Text>
          <TouchableOpacity onPress={createSession} style={{backgroundColor: '#007AFF', borderRadius: 6, width: '100', alignItems: "center", height: 40, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontSize: 17, fontWeight: 500}}>Create</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Session Subject"
                value={subject}
                onChangeText={setSubject}
            />
            <TextInput
                style={styles.input}
                placeholder="Session Sub Topic"
                value={sub_topic}
                onChangeText={setSubTopic}
            />
            <TextInput
                style={[styles.input, { height: 90 }]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <View style={styles.row}>
              <Text style={styles.label}>Date :</Text>
            </View>
            <View style={styles.datePickerContainer}>
              <RNDateTimePicker value={startDate} mode="date" display="inline" timeZoneName={'Africa/Casablanca'} onChange={onChangeDate}/>
            </View>
            <View style={{ marginVertical: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.label}>Start Time:</Text>
                  <View style={[styles.datePickerContainer, {backgroundColor: '#eee'}]}>
                    <RNDateTimePicker
                      value={startTime}
                      mode="time"
                      is24Hour={true}
                      onChange={(event, selectedTime) => {
                        if (selectedTime) {
                          setStartTime(selectedTime);
                        }
                      }}
                    />
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>End Time:</Text>
                  <View style={styles.datePickerContainer}>
                    <RNDateTimePicker
                      value={endTime}
                      mode="time"
                      is24Hour={true}
                      onChange={(event, selectedTime) => {
                        if (selectedTime) {
                          const duration = (selectedTime.getHours() * 60 + selectedTime.getMinutes()) - (startTime.getHours() * 60 + startTime.getMinutes());
                          
                          setEndTime(selectedTime);
                          setEstimatedDuration(duration);
                        }
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 16 }}>
                  Estimated Duration: {Math.floor(estimatedDuration / 60)}h {estimatedDuration % 60}m
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Online Session:</Text>
              <Switch value={onlineSession} onValueChange={setOnlineSession} />
            </View>

            {onlineSession ? (
              <TextInput
                style={styles.input}
                placeholder="Enter Meeting Link"
                value={meetingLink}
                onChangeText={setMeetingLink}
              />
            ) : (
              <></>
            )}
            <View style={styles.row}>
                <Text style={styles.label}>Max Participants:</Text>
                <View style={styles.participantControl}>
                    <TouchableOpacity onPress={removeParticipant} style={styles.iconButton}>
                        <AntDesign name="minus" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.participantText}>{maxParticipants}</Text>
                    <TouchableOpacity onPress={addParticipant} style={styles.iconButton}>
                        <AntDesign name="plus" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Required Level:</Text>
            </View>
            <View style={styles.levelContainer}>
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <TouchableOpacity
                        key={level}
                        onPress={() => setRequiredLevel(level)}
                        style={[
                            styles.levelButton,
                            requiredLevel === level && styles.selectedLevelButton(level),
                        ]}
                    >
                        <Text style={{ color: requiredLevel === level ? '#fff' : '#000' }}>{level}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Pick Location : ( {location?.title} )</Text>
            </View>
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                style={styles.mapContainer}
                onPress={() => navigation.navigate('pick_location')}
                disabled={onlineSession} // Prevents interaction if online_session is true
              >
                <MapView
                  style={styles.map}
                  initialRegion={location}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  rotateEnabled={false}
                  pitchEnabled={false}
                >
                  <Marker coordinate={location} title={location.title} description={location.description} />
                </MapView>
              </TouchableOpacity>

              {onlineSession && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>Location selection disabled during online session</Text>
                </View>
              )}
            </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        height: 50,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 7
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
    },
    participantControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        height: 39,
    },
    iconButton: {
        paddingHorizontal: 9,
    },
    participantText: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        paddingHorizontal: 10,
        borderColor: '#000',
    },
    levelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        flexWrap: 'wrap',
        gap: 10,
    },
    levelButton: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
    },
    selectedLevelButton: (level) => ({
        backgroundColor:
            level === 'Beginner' ? '#337bff' :
            level === 'Intermediate' ? '#fa9500' :
            level === 'Advanced' ? '#e71d36' : '#000',
        borderColor:
            level === 'Beginner' ? '#337bff' :
            level === 'Intermediate' ? '#fa9500' :
            level === 'Advanced' ? '#e71d36' : '#000',
    }),
    datePickerContainer: {
        backgroundColor: '#eee',
        borderRadius: 8,
        padding: 5,
        marginVertical: 10,
    },
    mapContainer: {
      width: '100%',
      height: 190,
      backgroundColor: '#eee',
      borderRadius: 8,
      overflow: 'hidden',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 190,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    overlayText: {
      color: '#333',
      fontWeight: 'bold',
    },
});
