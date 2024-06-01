// pages/EventPage.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  inactiveTab: {
    borderBottomColor: 'gray',
  },
  activeTabText: {
    color: '#000',
  },
  inactiveTabText: {
    color: 'gray',
  },
  noEventsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  noEventsText: {
    fontSize: 18,
    color: '#000',
  },
  createButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventPage;
