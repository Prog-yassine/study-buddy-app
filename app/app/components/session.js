import { StyleSheet, Text, TouchableOpacity, View, Image, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Session({data}) {
  const navigation = useNavigation();
  const visibleAvatars = data?.members.slice(0, 4);
  const extraCount = data?.members.length - visibleAvatars.length;
  const [requested, setRequested] = useState(false);


  // Add 6 days (6 * 24 * 60 * 60 * 1000 milliseconds)




  const Session_data = {
    id: data?.id,
    subject: data?.subject,
    sub_topic: data?.sub_topic,
    session_type: data?.session_type,
    location: data?.location,
    date: data?.date,
    startTime: data?.start_time,
    duration: data?.estimated_duration_minutes,
    required_level: data?.required_level,
    description: data?.description,
    max_members: data?.max_members,
    status: requested === true ? 'Requested' : data?.status,
    members: data?.members
  }

  console.log(data)

  return (
    <Pressable
      style={[
        styles.container,
        data?.status === 'Joined' ? { backgroundColor: '#f5f5f5' } : {},
      ]}
      onPress={() => navigation.navigate('Session_details', { data: Session_data })}
    >
      <View style={styles.nav}>
        <View style={styles.subject}>
          <Text style={styles.subjectText} numberOfLines={1} ellipsizeMode="tail">
            {data?.subject}
          </Text>
          <Text style={styles.subTopicText} numberOfLines={1} ellipsizeMode="tail">
            {data?.sub_topic}
          </Text>
          <Text style={styles.dateText}>{data?.date} at {data?.start_time}</Text>
        </View>

        <View style={styles.memberCountBox}>
          <Text style={styles.memberCountText}>
            {data?.members.length} / {data?.max_members}
          </Text>
          <Text style={styles.memberCountSub}>joined</Text>
        </View>
      </View>


      <View style={styles.avatarGroup}>
        {visibleAvatars.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item.avatar }}
            style={[styles.avatar, { left: index * 20, zIndex: 10 + index }]}
          />
        ))}
        {extraCount > 0 && (
          <View
            style={[
              styles.avatar,
              styles.extraAvatar,
              { left: visibleAvatars.length * 20 },
            ]}
          >
            <Text style={styles.extraText}>+{extraCount}</Text>
          </View>
        )}
      </View>
  
      <View style={styles.footer}>
        <View
          style={[
            styles.levelTag,
            data?.required_level === 'Beginner'
              ? { backgroundColor: '#337bff' }
              : data?.required_level === 'Intermediate'
              ? { backgroundColor: '#fa9500' }
              : { backgroundColor: '#e71d36' },
          ]}
        >
          <Text style={styles.levelText}>{data?.required_level}</Text>
        </View>
        <Text style={styles.locationText}>on {data?.location}</Text>
      </View>
    </Pressable>
  );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 13,
    borderRadius: 8,
    marginVertical: 10
  },
  nav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subject: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '60%'
  },
  join: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#337bff',
    borderRadius: 8,
  },
  joined: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#699bf5',
    borderRadius: 8,
  },
  requested: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },  
  close: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
    marginTop: 10,
    height: 40,
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    backgroundColor: '#ccc',
  },
  extraAvatar: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000
  },
  extraText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subjectText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },
  subTopicText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
  },
  dateText: {
    fontSize: 13,
    color: 'gray',
    marginTop: 4,
  },
  joinText: {
    color: '#fff',
    fontWeight: '600',
  },
  requestedText: {
    color: '#333',
    fontWeight: '600',
  },
  closeText: {
    color: 'gray',
    fontWeight: '600',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    alignItems: 'center',
  },
  levelTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  levelText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 13,
    color: 'gray',
  },
  memberCountBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  memberCountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#337bff',
  },
  memberCountSub: {
    fontSize: 12,
    color: 'gray',
  },
  
});
