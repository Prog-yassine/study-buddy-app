import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function GroupeSession() {
  const navigation = useNavigation();


  return (
    <TouchableOpacity onPress={() => navigation.navigate('Message' )}>
        <View style={styles.container}>
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
            <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
                <Text style={styles.name}>English Groupe</Text>
                <Text style={{color: 'gray'}}>Yassine : Hello everyone</Text>
            </View>
        </View>
        <View style={{width: '80%', marginHorizontal: '10%', height: 1, backgroundColor: '#eee'}}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 70,
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
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});
