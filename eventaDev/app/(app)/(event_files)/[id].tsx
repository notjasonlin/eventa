import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { deleteEvent } from "../../../functions/deleteEvent";
import CancelAlert from "../../../components/CancelAlert";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleDelete = async () => {
    const deleteProceed = async () => {
      if (typeof (id) === "string") {
        setIsLoading(true);
        await deleteEvent(id);
        setIsLoading(false);
        router.replace("/(tabs)/event/fetchEvent");
        // router.back();
      }
    }

    Alert.alert("Delete this event?", "Deleted events cannot be recovered", [
      {
        text: "Delete",
        onPress: deleteProceed,
        style: "cancel",
      },
      {
        text: "Cancel",
        onPress: () => console.log("Operation canceled"),
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.details}>Date: {event.eventDate}</Text>
      <Text style={styles.details}>Time: {event.eventTime}</Text>
      <Text style={styles.details}>Location: {event.location}</Text>
      <Text style={styles.details}>Description: {event.description}</Text>
      <Pressable onPress={handleDelete}>
        <Text>Delete</Text>
      </Pressable>
      <ActivityIndicator size="large" animating={isLoading}/>
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
