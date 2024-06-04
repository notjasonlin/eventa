import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../lib/supabase';

interface Event {
  id: number;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  description: string;
}

const EventDetails: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching event details:", error);
      } else {
        setEvent(data);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.details}>Date: {event.eventDate}</Text>
      <Text style={styles.details}>Time: {event.eventTime}</Text>
      <Text style={styles.details}>Location: {event.location}</Text>
      <Text style={styles.details}>Description: {event.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
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
});

export default EventDetails;
