import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Profile({data}) {



    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{width: 50, height: 50, borderRadius: 1000, objectFit: 'cover'}} source={{uri : data?.avatar}}/>
                <View style={{flexDirection: 'column', paddingHorizontal: 7, alignItems: "flex-start"}}>
                    <Text style={{fontSize: 17, fontWeight: 500}}>{data?.fullname}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderColor: '#337bff', borderWidth: 1, borderRadius: 100}}>
                        <View style={{ paddingRight: 0, paddingLeft: 10, height: 20, alignItems: 'center', flexDirection: 'row', borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}>
                            <Text style={{color: '#337bff',fontSize: 12,}}>{data?.bolt}</Text>
                        </View>
                        <View style={{height: 20, flexDirection: 'row', alignItems: 'center', paddingRight: 6, borderTopRightRadius: 5, borderBottomRightRadius: 5}}>
                            <MaterialIcons name="bolt" size={17} color="#337bff" />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
});
