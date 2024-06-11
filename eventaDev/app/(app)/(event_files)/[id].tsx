import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../../lib/supabase";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { deleteEvent } from "../../../functions/eventFunctions";
import { UseDispatch, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux/store";
import { setEvents } from "../../../store/redux/events";

interface Event {
  id: number;
  created_at: string;
  eventType: string;
  eventName: string;
  eventTime: string;
  userId: string;
  location: string;
  eventDate: string;
  description: string;
}

const EventDetails: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Event | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchEventDetails = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Error fetching details: ", error);
      } else if (data) {
        setEvent(data);
        setFormData(data);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleUpdateEvent = async () => {
  if (formData) {
    console.log("Form data:", formData);
    console.log("Event ID:", id);

    // Check if the record exists
    const { data: existingData, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching event:", fetchError);
      Alert.alert("Error", "Failed to fetch the event details.");
      return;
    }

    if (!existingData) {
      console.error("Event not found with ID:", id);
      Alert.alert("Error", "Event not found.");
      return;
    }

    console.log("Existing event data:", existingData);

    // Proceed with the update if the record exists
    const { data, error } = await supabase
      .from("events")
      .update({
        eventType: formData.eventType,
        eventName: formData.eventName,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        location: formData.location,
        description: formData.description,
      })
      .eq("id", id)
      .select(); // Make sure to select the updated record

    console.log("Update response data:", data);
    console.log("Update response error:", error);

    if (error) {
      console.error("Error updating event:", error);
      Alert.alert("Error", "Failed to update the event.");
    } else if (data && data.length > 0) {
      console.log("hi1");
      setEvent(data[0]);
      dispatch(setEvents(null)); // Sets events redux to null to force useEffect in eventList to rerender the events 
      setIsEditing(false);
      console.log("Event updated");
      Alert.alert("Event Updated", "The event has been updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(), // router.replace("/(tabs)/event/eventList")
        },
      ]);
      console.log("After event");
    } else {
      console.log("No data returned from update or data is empty");
      Alert.alert("Error", "No data returned from update.");
    }
  }
};


  const handleDeleteEvent = async () => {
    const deleteProceed = async () => {
      if (typeof id === "string") {
        setIsLoading(true);
        await deleteEvent(id);
        dispatch(setEvents(null));
        setIsLoading(false);
        // router.replace("/(tabs)/event/eventList");
        router.back();
      }
    }

    Alert.alert("Delete this event?", "Event cannot be recovered if deleted", [
      {
        text: "Delete",
        onPress: deleteProceed,
        style: "destructive",
      },
      {
        text: "Cancel",
        onPress: () => console.log("Operation canceled"),
        style: "cancel",
      },
    ]);
  };

  const handleChange = (name: keyof Event, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateConfirm = (selectedDate: Date) => {
    setShowDatePicker(false);
    setFormData((prevData) => prevData ? { ...prevData, eventDate: selectedDate.toISOString().split('T')[0] } : null);
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    setShowTimePicker(false);
    setFormData((prevData) => prevData ? { ...prevData, eventTime: selectedTime.toTimeString().split(' ')[0] } : null);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            style={styles.input}
            value={formData?.eventName}
            onChangeText={(text) => handleChange("eventName", text)}
            placeholder="Enter event name"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.label}>Event Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={styles.timeText}>{formData?.eventDate}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setShowDatePicker(false)}
          />
          <Text style={styles.label}>Event Time</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
            <Text style={styles.timeText}>{formData?.eventTime}</Text>
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
            value={formData?.location}
            onChangeText={(text) => handleChange("location", text)}
            placeholder="Enter location"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formData?.description}
            onChangeText={(text) => handleChange("description", text)}
            placeholder="Enter description"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateEvent}>
            <Text style={styles.buttonText}>Update Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteEvent}>
            <Text style={styles.buttonText}>Delete Event</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>{event.eventName}</Text>
          <Text style={styles.details}>Date: {event.eventDate}</Text>
          <Text style={styles.details}>Time: {event.eventTime}</Text>
          <Text style={styles.details}>Location: {event.location}</Text>
          <Text style={styles.details}>Description: {event.description}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Edit Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteEvent}>
            <Text style={styles.buttonText}>Delete Event</Text>
          </TouchableOpacity>
          <ActivityIndicator size="large" animating={isLoading}/>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000',
  },
  timeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EventDetails;
