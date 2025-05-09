import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MessageComponent({ message, showAvatar }) {
  const isMe = message.sender === 'me';

  return (
    <View style={[styles.container, isMe ? styles.right : styles.left]}>
      {!isMe && showAvatar ? (
        <Image source={{ uri: message.avatar }} style={styles.avatar} />
      ) : 
        <View style={styles.avatar}></View>
      }
      <View style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
        <Text style={[styles.text, isMe ? styles.bubbleRightText : styles.bubbleLeftText]}>{message.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-end',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  bubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: '75%',
  },
  bubbleLeft: {
    backgroundColor: '#eee',
  },
  bubbleRight: {
    backgroundColor: '#007AFF',
  },
  text: {
    color: '#000',
  },
  ubbleLeftText: {
    color: '#000',
  },
  bubbleRightText: {
    color: '#fff',
  },
});
