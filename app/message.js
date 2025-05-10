import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons, AntDesign, Feather, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import MessageComponent from './components/message';


const height = Dimensions.get('window').height;

const messagesData = [
    { id: 1, text: 'Hey there!', sender: 'other', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, text: 'How are you?', sender: 'other', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 3, text: 'I’m good, thanks! And you?', sender: 'me' },
    { id: 4, text: 'I’m doing great too.', sender: 'other', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 5, text: 'Awesome!', sender: 'me' },
    { id: 6, text: 'Let’s catch up later.', sender: 'me' },
    { id: 7, text: 'Sure thing.', sender: 'other', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
];


export default function Message() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState(messagesData);


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal: 10}}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              <View style={styles.avatarStack}>
                  <Image
                  style={[styles.avatar, { zIndex: 1, transform: [{ translateY: -5 }] }]}
                  source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                  />
                  <Image
                  style={[styles.avatar, styles.avatarOverlap, {transform: [{ translateY: 5 }]}]}
                  source={{ uri: 'https://randomuser.me/api/portraits/men/4.jpg' }}
                  />
              </View>
              <Text style={styles.title}>English Group</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="logout" size={24} color="red" />
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', padding: 10 }}>
            {messages.map((msg, index) => {
                const prevMsg = messages[index - 1];
                const showAvatar = !prevMsg || prevMsg.sender !== msg.sender;
                return <MessageComponent key={msg.id} message={msg} showAvatar={showAvatar} />;
            })}
        </ScrollView>
        <View style={styles.footer}>
            <TextInput placeholder='Type your message' style={styles.input} autoComplete="off" autoCorrect={false}/>
            <TouchableOpacity style={styles.sendButton}>
                <Feather name="send" size={20} color="#fff" />
            </TouchableOpacity>
        </View>

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
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  ScrollView: {
    height: height - 80,
    width: '100%',
    backgroundColor: '#fff',
    padding: 20
  },
  footer: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    height: 40,
    borderRadius: 100,
    paddingHorizontal: 10,
    marginRight: 10, // Add spacing before the send button
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40
  },
  avatarStack: {
    flexDirection: 'row',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarOverlap: {
    marginLeft: -20,
    zIndex: 1,
  },
});
