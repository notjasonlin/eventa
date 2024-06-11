import { supabase } from '../lib/supabase';
import { Event } from '../app/(app)/(event_files)/eventInterface';


// const dispatch = useDispatch<AppDispatch>()

export const fetchEvents = async (userId: string): Promise<{ events: Event[], pastEvents: Event[]; upcomingEvents: Event[] }> => {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("userId", userId);

  if (error) {
    console.error("Error fetching events:", error);
    throw error;
  }

  // dispatch(setEvents(events));

  const today = new Date().toISOString().split('T')[0];

  const pastEvents = events.filter((event: Event) => event.eventDate < today);
  const upcomingEvents = events.filter((event: Event) => event.eventDate >= today);

  return { events, pastEvents, upcomingEvents };
};

export const deleteEvent = async (id: string) => {
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Error deleting event:", error);
    }

}