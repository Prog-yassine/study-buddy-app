import { registerRootComponent } from 'expo';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { supabase } from './app/supabase';

import Home from './app/home';
import Profile from './app/profile';
import Create_session from './app/create_session';
import Calendar from './app/calendar';
import Chat from './app/chat';
import Search from './app/search';
import Session_details from './app/session_details';
import Pick_Location from './app/pick_location';
import Edite_Profile from './app/edite_profile';
import Notification from './app/notification';
import ChangePassword from './app/change_password';
import Message from './app/message';
import Fav from './app/fav';
import Login from './app/login';
import Register from './app/register';
import Session from './app/components/session';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigator = ({sessions , userData}) => (
  
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Calendar') {
          iconName = 'calendar';
        } else if (route.name === 'Create') {
          iconName = 'add';
        } else if (route.name === 'Profile') {
          iconName = 'user';
        } else if (route.name === 'Chat') {
          iconName = 'chatbubbles-sharp';
        }

        return route.name === "Profile" 
          ? (<FontAwesome name={iconName} size={size} color={color} />) 
          : (<Ionicons name={iconName} size={size} color={color} />);
      },
      tabBarActiveTintColor: '#007aff',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home">
      {() => <Home sessions={sessions}/>}
    </Tab.Screen>
    <Tab.Screen name="Calendar">
      {() => <Calendar userData={userData}/>}
    </Tab.Screen>
    <Tab.Screen name="Create">
      {() => <Create_session />}
    </Tab.Screen>
    <Tab.Screen name="Chat">
      {() => <Chat />}
    </Tab.Screen>
    <Tab.Screen name="Profile">
      {() => <Profile userData={userData}/>}
    </Tab.Screen>
  </Tab.Navigator>
);

const MainStack = ({ isLoggedIn, sessions, userData }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={() => <TabsNavigator sessions={sessions} userData={userData}/>}/>
              <Stack.Screen name="Message" component={Message} />
            </Stack.Group>
            <Stack.Group screenOptions={{ headerShown: true, presentation: 'modal' }}>
              <Stack.Screen name="Profile" component={Profile} options={{ title: 'New Session' }} />
              <Stack.Screen name="Search" component={Search} options={{ title: 'Search' }} />
              <Stack.Screen name="Session_details" component={Session_details} options={{ title: 'Details' }} />
              <Stack.Screen name="pick_location" component={Pick_Location} options={{ title: 'Pick Location' }} />
              <Stack.Screen name="Edite_Profile" component={Edite_Profile} options={{ title: 'Edit Profile' }} />
              <Stack.Screen name="Notification" component={Notification} options={{ title: 'Notifications' }} />
              <Stack.Screen name="Change_Password" component={ChangePassword} options={{ title: 'Change Password' }} />
              <Stack.Screen name="Fav" component={Fav} options={{ title: 'Favorites' }} />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [userData,  setuserData] = useState();
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setLoading(false);

      if (session) {
        setUserSession(session.user.id); // This will trigger the useEffect for fetchUserData
        fetchSessions();
      }
    };

    checkSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);

      if (session) {
        setUserSession(session.user.id); // This will trigger the useEffect for fetchUserData
        fetchSessions();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userSession) {
      fetchUserData();
    }
  }, [userSession]);

  const fetchSessions = async () => {
    try {
      const response = await fetch('https://study-buddy-api-production.up.railway.app/session/sessions-open'); // Replace with your API URL
      const data = await response.json();
      setSessions(data?.sessions);
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  };


  const fetchUserData = async () => {
    try {
      if (userSession) {
        const response = await fetch('https://study-buddy-api-production.up.railway.app/user/' + userSession);
        const data = await response.json();
        setuserData(data);
      } else {
        console.warn('User session is undefined. Cannot fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainStack isLoggedIn={isLoggedIn} sessions={sessions} userData={userData}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
