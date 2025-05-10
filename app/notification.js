import { StyleSheet, Text, View, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Notification() {
  const navigation = useNavigation();

  const [pushNotif, setPushNotif] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={handleSave}>
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, pushNotif]);

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.description}>
          Enable notifications to stay updated! When you activate notifications, you'll receive timely alerts and reminders about all the important updates related to your sessions — including changes, upcoming events, and participation prompts.
        </Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Receive Notifications</Text>
          <Switch value={pushNotif} onValueChange={setPushNotif} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
    color: '#333',
    lineHeight: 22,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
