import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { supabase } from '../../../lib/supabase'; // Adjust the import based on your project structure
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../../store/redux/store';
import { setEvents } from '../../../store/redux/events';
import { router } from 'expo-router';
import uuid from 'react-native-uuid';

const EventForm: React.FC = () => {
  const [eventType, setEventType] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventTime, setEventTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('Boston'); // Default to Boston
  const [description, setDescription] = useState<string>(''); // Added description
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const session = useSelector((state: RootState) => state.authentication.session);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!eventType) newErrors.eventType = 'Event type is required';
    if (!eventName) newErrors.eventName = 'Event name is required';
    if (!location) newErrors.location = 'Location is required';
    if (!description) newErrors.description = 'Description is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Please fill out all required fields');
      return;
    }

    setErrorMessage('');

    if (session === null) {
      console.error("Session is null!");
    } else {
      const eventDateValue = eventDate.toISOString().split('T')[0]; // Get only the date part
      const eventTimeValue = eventTime ? eventTime.toTimeString().split(' ')[0] : null; // Get only the time part if eventTime is not null

      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            id: uuid.v4(),
            userId: session.user.id,
            eventType,
            eventName,
            eventDate: eventDateValue,
            eventTime: eventTimeValue,
            location,
            description // Add description to the database
          }
        ]);

      if (error) {
        Alert.alert('Error', 'Error creating event: ' + error.message);
      } else {
        dispatch(setEvents(null));
        Alert.alert('Success', 'Event created successfully');
        setEventType(''); // Clear form fields
        setEventName('');
        setEventDate(new Date());
        setEventTime(null);
        setLocation('Boston');
        setDescription(''); // Clear description
        router.back();
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
      {errors.eventType && <Text style={styles.errorText}>{errors.eventType}</Text>}

      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Enter event name"
        placeholderTextColor="#aaa"
      />
      {errors.eventName && <Text style={styles.errorText}>{errors.eventName}</Text>}

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
      {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor="#aaa"
        multiline={true}
        numberOfLines={4}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
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
    color: '#333',
    fontFamily: 'HelveticaNeue-Medium',
  },
  input: {
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#333',
    backgroundColor: '#F9F9F9',
    fontFamily: 'HelveticaNeue',
  },
  textArea: {
    height: 100,
  },
  dropdown: {
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  dropdownText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'HelveticaNeue',
  },
  dropdownView: {
    height: 40,
    justifyContent: 'center',
  },
  timeText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'HelveticaNeue',
  },
  createButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#000', // emerald green
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'HelveticaNeue',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'HelveticaNeue',
  },
});

export default EventForm;
