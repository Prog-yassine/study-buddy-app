import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Fav() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [meetingPreference, setMeetingPreference] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedEnvironments, setSelectedEnvironments] = useState([]);
  const [selectedLearningStyles, setSelectedLearningStyles] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'Computer Science'];
  const preferences = ['Online', 'In-person'];
  const studyTimes = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const environments = ['Library', 'Cafe', 'Home', 'Outdoor'];
  const learningStyles = ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const toggleSelection = (item, setState, state) => {
    setState((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Favorite Subjects Section */}
        <Text style={styles.label}>What are your favorite subjects?</Text>
        <View style={styles.buttonGroup}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.button,
                selectedSubjects.includes(subject) && styles.selectedButton,
              ]}
              onPress={() => toggleSelection(subject, setSelectedSubjects, selectedSubjects)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedSubjects.includes(subject) && styles.selectedButtonText,
                ]}
              >
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Meeting Preferences Section */}
        <Text style={styles.label}>Where do you prefer to meet?</Text>
        <View style={styles.buttonGroup}>
          {preferences.map((preference) => (
            <TouchableOpacity
              key={preference}
              style={[
                styles.button,
                meetingPreference === preference && styles.selectedButton,
              ]}
              onPress={() => setMeetingPreference(preference)}
            >
              <Text
                style={[
                  styles.buttonText,
                  meetingPreference === preference && styles.selectedButtonText,
                ]}
              >
                {preference}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferred Study Times Section */}
        <Text style={styles.label}>What are your preferred study times?</Text>
        <View style={styles.buttonGroup}>
          {studyTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.button,
                selectedTimes.includes(time) && styles.selectedButton,
              ]}
              onPress={() => toggleSelection(time, setSelectedTimes, selectedTimes)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedTimes.includes(time) && styles.selectedButtonText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferred Study Environments Section */}
        <Text style={styles.label}>What is your preferred study environment?</Text>
        <View style={styles.buttonGroup}>
          {environments.map((environment) => (
            <TouchableOpacity
              key={environment}
              style={[
                styles.button,
                selectedEnvironments.includes(environment) && styles.selectedButton,
              ]}
              onPress={() => toggleSelection(environment, setSelectedEnvironments, selectedEnvironments)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedEnvironments.includes(environment) && styles.selectedButtonText,
                ]}
              >
                {environment}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Favorite Learning Styles Section */}
        <Text style={styles.label}>What is your favorite learning style?</Text>
        <View style={styles.buttonGroup}>
          {learningStyles.map((style) => (
            <TouchableOpacity
              key={style}
              style={[
                styles.button,
                selectedLearningStyles.includes(style) && styles.selectedButton,
              ]}
              onPress={() => toggleSelection(style, setSelectedLearningStyles, selectedLearningStyles)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedLearningStyles.includes(style) && styles.selectedButtonText,
                ]}
              >
                {style}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Academic Level Section */}
        <Text style={styles.label}>What is your academic level?</Text>
        <View style={styles.buttonGroup}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.button,
                selectedLevel === level && styles.selectedButton,
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedLevel === level && styles.selectedButtonText,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  scrollView: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
  },
});
