import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

interface Event {
  id: number;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(event_files)/${event.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>{event.eventName}</Text>
        <Text style={styles.details}>Date: {event.eventDate}</Text>
        <Text style={styles.details}>Time: {event.eventTime}</Text>
        <Text style={styles.details}>Location: {event.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default EventCard;
