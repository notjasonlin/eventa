// components/EventForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { supabase } from '../lib/supabase'; // Adjust the import based on your project structure
import styles from '../styles/EventFormStyles'; // Import the styles

const EventForm: React.FC = () => {
  const [eventType, setEventType] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventTime, setEventTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('Boston'); // Default to Boston
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const handleSubmit = async () => {
    const eventTimeValue = eventTime ? eventTime.toISOString() : null;

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          eventType,
          eventName,
          eventDate: eventDate.toISOString().split('T')[0], // Only the date part
          eventTime: eventTimeValue,
          location
        }
      ]);

    if (error) {
      Alert.alert('Error', 'Error creating event: ' + error.message);
    } else {
      Alert.alert('Success', 'Event created successfully');
      // Optionally, you can navigate back or clear the form here
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

export default EventForm;
