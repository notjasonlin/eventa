// pages/EventPage.tsx
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../../../lib/supabase';
import EventCard from '../../../../components/eventCard';


const EventPage: React.FC = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const router = useRouter();

  const fetchEvents = async () => {
    const { data: events, error } = await supabase
      .from("events")
      .select("*");
  
    if (error) {
      console.error("Error fetching events:", error);
      return;
    }
  
    const today = new Date().toISOString().split('T')[0];
  
    const pastEvents = events.filter(event => event.eventDate < today);
    const upcomingEvents = events.filter(event => event.eventDate >= today);
    setPastEvents(pastEvents);
    setUpcomingEvents(upcomingEvents);
    // console.log("Past events:", pastEvents);
    // console.log("Future events:", upcomingEvents);
  
    return { pastEvents, upcomingEvents };
  };

  // const addNewItem = async (event) => {
  //   const { data: events, error } = await supabase
  //     .from("events")
  //     .insert([{ eventName:  }]);
  
  //   return events;
  // };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    //console.log('Create Event button pressed'); // Log button press
    router.push('/add-event'); // This route should now match the file name in the pages directory
    //console.log('Create Event button pressed after router push'); // Log button press

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
      <View style={styles.container}>
      {activeTab === 'Upcoming' ? (
        upcomingEvents.length > 0 ? (
          <View style={styles.eventsContainer}>
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No upcoming events.</Text>
          </View>
        )
      ) : (
        pastEvents.length > 0 ? (
          <View style={styles.eventsContainer}>
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No past events.</Text>
          </View>
        )
      )}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Create a new event</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 2,
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
  eventsContainer: {
    marginVertical: 1,
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
