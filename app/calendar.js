import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const HOUR_HEIGHT = 80; // or even 50
const START_HOUR = 0; // Start at midnight
const END_HOUR = 24;  // End at midnight next day
const INITIAL_SCROLL_HOUR = 7;

export default function Calendar({ userData }) {
  const Dataevents = [
    {
      id: 1,
      timeStart: '08:00', // Corrected from 'timeSatrt' to 'timeStart'
      timeEnd: '09:00',
      title: 'Event 1',
      data: '2025-05-08',
      color: '#4285F4',
    },
    {
      id: 2,
      timeStart: '10:00', // Corrected from 'timeSatrt' to 'timeStart'
      timeEnd: '12:30',
      title: 'Event 1',
      data: '2025-05-08',
      color: '#023047',
    },
    {
      id: 3,
      timeStart: '10:00', // Corrected from 'timeSatrt' to 'timeStart'
      timeEnd: '12:00',
      title: 'Event 2',
      data: '2025-05-09',
      color: '#3a5a40',
    },
    {
      id: 4,
      timeStart: '05:00', // Corrected from 'timeSatrt' to 'timeStart'
      timeEnd: '09:00',
      title: 'Event 2',
      data: '2025-05-10',
      color: '#0077b6',
    },
    {
      id: 5,
      timeStart: '11:00', // Corrected from 'timeSatrt' to 'timeStart'
      timeEnd: '13:00',
      title: 'Event 2',
      data: '2025-05-10',
      color: '#4f772d',
    },
  ];

  const [allEvents, setallEvents] = useState(Dataevents || []);
  const [currentTimePosition, setCurrentTimePosition] = useState(null);
  const [selectedDay, setSelectedDay] = useState(moment().date());
  const scrollViewRef = useRef(null);
  const selectedDateMoment = moment({
    year: moment().year(),
    month: moment().month(),
    day: selectedDay
  });
  const [ShowSearch, setShowSearch] = useState(false);
  console.log(allEvents)
  const selectedDate = selectedDateMoment.format('YYYY-MM-DD');
  const isToday = selectedDateMoment.isSame(moment(), 'day');
  const navigation = useNavigation();

  useEffect(() => {
    if (isToday) {
      const now = moment();
      const currentHour = now.hours();
      const currentMinute = now.minutes();

      if (currentHour >= START_HOUR && currentHour < END_HOUR) {
        const minutesSinceStart = (currentHour - START_HOUR) * 60 + currentMinute;
        const position = (minutesSinceStart / 60) * HOUR_HEIGHT; // Correct calculation
        setCurrentTimePosition(position);
      }
    }
  }, [isToday]);

  const generateDaysOfCurrentMonth = () => {
    const now = moment();
    const daysInMonth = now.daysInMonth();
    const currentMonth = now.month();
    const currentYear = now.year();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = moment({ year: currentYear, month: currentMonth, day: i + 1 });
      return {
        date: i + 1,
        day: date.format('ddd'),
        fullDate: date.format('YYYY-MM-DD')
      };
    });
  };

  const groupEventsByDay = () => {
    const result = {};
    for (const event of allEvents) {
      if (!event.data) continue; // Use 'data' instead of 'date'
      if (!result[event.data]) result[event.data] = []; // Use 'data' instead of 'date'
      result[event.data].push(event); // Use 'data' instead of 'date'
    }
    return result;
  };

  const days = generateDaysOfCurrentMonth();
  const eventsByDay = groupEventsByDay();
  const events = eventsByDay[selectedDate] || [];


  useEffect(() => {
    if (scrollViewRef.current) {
      const offset = INITIAL_SCROLL_HOUR * HOUR_HEIGHT;
      scrollViewRef.current.scrollTo({ y: offset, animated: false });
    }
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{borderBottomColor: '#eee', borderBottomWidth: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{moment().format('MMMM YYYY')}</Text>
          <TouchableOpacity style={styles.searchButton} onPress={() => setShowSearch(!ShowSearch)}>
            <Ionicons name="search-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
        {
          ShowSearch &&
          <View style={{width: '100%', height: '70', padding: 10}}>
            <TextInput placeholder='Search for a Session' keyboardType="web-search" style={{width: '100%', backgroundColor: '#eee', paddingHorizontal: 10, height: '100%', borderRadius: 8}}/>
          </View>
        }
      </View>

      <ScrollView ref={scrollViewRef} style={styles.scrollview}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector} ref={scrollViewRef}>
          {days.map(({ date, day }) => {
            const isSelected = selectedDay === date;
            return (
              <TouchableOpacity
                key={date}
                onPress={() => setSelectedDay(date)}
                style={[styles.dateContainer, isSelected && styles.selected]}
              >
                <Text style={[styles.dateText, isSelected && styles.selectedText]}>{date}</Text>
                <Text style={[styles.dayText, isSelected && styles.selectedText]}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.dayHeader}>
          <Text style={styles.dayHeaderText}>
            {selectedDate} {isToday && '(Today)'}
          </Text>
          <Text style={styles.dayHeaderTextHighlight}>{events.length} Event{events.length !== 1 ? 's' : ''}</Text>
        </View>
        <View style={styles.body}>
          {/* Left time labels */}
          <View style={styles.timeColumn}>
            <View style={{ height: 30, justifyContent: 'flex-start' }}>
              <Text style={styles.timeLabel}></Text>
            </View>
            {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => {
              const hour = START_HOUR + i;
              return (
                <View key={hour} style={{ height: HOUR_HEIGHT, justifyContent: 'flex-start' }}>
                  <Text style={styles.timeLabel}>{moment({ hour }).format('hh:00 A')}</Text>
                </View>
              );
            })}

          </View>


          {/* Events + background + red line */}
          <View style={styles.eventColumn}>
            <View style={{height: 30, borderBottomColor: '#eee', borderBottomWidth: 1}}></View>
            {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => (
              <View key={i} style={styles.hourBackground} />
            ))}

            {isToday && currentTimePosition !== null && (
              <View style={[styles.redLine, { top: currentTimePosition + 30 }]} />
            )}

            {events.map((event) => {
              const start = moment(event.timeStart, 'HH:mm');
              const end = moment(event.timeEnd, 'HH:mm');
              const height = (end.diff(start, 'minutes') / 60) * HOUR_HEIGHT; // Correct calculation
              const top = ((start.hours() - START_HOUR) + start.minutes() / 60) * HOUR_HEIGHT + 30; // Correct calculation

              return (
                <View key={event.id} style={[styles.event, { top, height }]}>
                  <Pressable
                    style={[styles.eventPressable, { backgroundColor: event.color }]}
                    onPress={() => navigation.navigate('Session_details', { data: {} })} // Corrected navigation to 'Session_details'
                  >
                    <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
                    <Text style={styles.eventTime}>{event.timeStart} - {event.timeEnd}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: '#000', fontSize: 26, fontWeight: '500' },
  searchButton: {
    width: 40,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelector: { paddingVertical: 5 },
  dateContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 6,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  selected: { backgroundColor: '#4285F4' },
  dateText: { fontSize: 18, fontWeight: '600', color: '#000' },
  dayText: { fontSize: 14, color: '#555' },
  selectedText: { color: '#fff' },
  dayHeader: {
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1 
  },
  dayHeaderText: { fontWeight: '500' },
  dayHeaderTextHighlight: { fontWeight: '500', color: '#4782d6' },
  body: { flexDirection: 'row' },
  timeColumn: { borderRightWidth: 1, borderColor: '#eee' },
  timeSlot: { height: HOUR_HEIGHT, justifyContent: 'flex-start' },
  timeLabel: { paddingHorizontal: 8, fontSize: 12, color: '#444', transform: [{ translateY: -10 }] },
  eventColumn: { flex: 1, position: 'relative' },
  hourBackground: {
    height: HOUR_HEIGHT,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  redLine: {
    height: 2,
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  event: {
    position: 'absolute',
    left: 10,
    right: 10,
    borderRadius: 6,
    overflow: 'hidden',
    paddingVertical: 10
  },
  eventPressable: {
    flex: 1,
    padding: 6,
    borderRadius: 6,
  },
  eventTitle: { color: '#fff', fontWeight: '600', fontSize: 14 },
  eventTime: { color: '#f0f0f0', fontSize: 12 },
  scrollview: { flex: 1 },
});
