import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { supabase } from '../../../lib/supabase'; // Adjust the import based on your project structure
//import { useAuth } from '../../context/auth';
import { useSelector } from "react-redux";
import { RootState } from '../../../store/redux/store';
import { router } from 'expo-router';

const EventForm: React.FC = () => {
  const [eventType, setEventType] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventTime, setEventTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('Boston'); // Default to Boston
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const session = useSelector((state: RootState) => state.authentication.session);

  const handleSubmit = async () => {
    if (session === null) {
      console.error("Session is null!");
    } else {
      const eventDateValue = eventDate.toISOString().split('T')[0]; // Get only the date part
      const eventTimeValue = eventTime ? eventTime.toTimeString().split(' ')[0] : null; // Get only the time part if eventTime is not null

      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            userId: session.user.id,
            eventType,
            eventName,
            eventDate: eventDateValue,
            eventTime: eventTimeValue,
            location
          }
        ]);

      if (error) {
        Alert.alert('Error', 'Error creating event: ' + error.message);
      } else {
        Alert.alert('Success', 'Event created successfully');
        setEventType(''); // Clear form fields
        setEventName('');
        setEventDate(new Date());
        setEventTime(null);
        setLocation('Boston');
        router.push('../event/eventList');
      }
    }
  };

  const handleDateConfirm = (selectedDate: Date) => {
    setShowDatePicker(false);
    setEventDate(selectedDate);
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    setShowTimePicker(false);
    setEventTime(selectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Type</Text>
      <ModalSelector
        data={[
          { key: 1, label: 'Bar Mitzvah' },
          { key: 2, label: 'Bat Mitzvah' },
          { key: 3, label: 'B\'nai Mitzvah' },
          { key: 4, label: 'Sweet 16' },
          { key: 5, label: 'Quinceañera' },
          { key: 6, label: 'Other' },
        ]}
        initValue="Select event type"
        onChange={(option) => setEventType(option.label)}
        style={styles.dropdown}
        selectTextStyle={styles.dropdownText}
        optionTextStyle={styles.dropdownText}
      >
        <View style={styles.dropdownView}>
          <Text style={styles.dropdownText}>
            {eventType || 'Select event type'}
          </Text>
        </View>
      </ModalSelector>

      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Enter event name"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Event Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={styles.timeText}>{eventDate.toDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
      />

      <Text style={styles.label}>Event Time (optional)</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text style={styles.timeText}>{eventTime ? eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select event time'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setShowTimePicker(false)}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation} // Allow changing location
        placeholder="Enter location"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'black',
    fontWeight: 'bold',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000',
  },
  dropdown: {
    height: 40,
    borderColor: 'black',  // Set border color to black
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: 'black',  // Set dropdown text color to black
    fontSize: 16,
    fontWeight: 'bold',  // Make the text bold
  },
  dropdownPlaceholder: {
    color: '#aaa',
    fontSize: 16,
  },
  dropdownOptions: {
    width: '90%',
    marginLeft: '5%',
  },
  dropdownView: {
    height: 40,
    justifyContent: 'center',
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  timeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',  // Make the text bold
  },
  createButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventForm;
