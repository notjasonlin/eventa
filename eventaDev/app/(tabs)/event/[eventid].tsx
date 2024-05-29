// pages/EventPage.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/EventPageStyles'; // Adjust the path as needed

const EventPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const router = useRouter();

  const handleCreateEvent = () => {
    router.push('/add-event'); // Adjust the route as per your app structure
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Events</Text>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Upcoming' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={activeTab === 'Upcoming' ? styles.activeTabText : styles.inactiveTabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Past' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('Past')}
        >
          <Text style={activeTab === 'Past' ? styles.activeTabText : styles.inactiveTabText}>Past</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noEventsContainer}>
        {activeTab === 'Upcoming' ? (
          <Text style={styles.noEventsText}>No upcoming events.</Text>
        ) : (
          <Text style={styles.noEventsText}>No past events.</Text>
        )}
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Create a new event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EventPage;
