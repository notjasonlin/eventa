import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../app/(app)/(event_files)/eventInterface";

interface EventsState {
    events: Event[] | null;
    upcomingEvents: Event[] | null;
    pastEvents: Event[] | null;
}

const initialState: EventsState = {
    events: null,
    upcomingEvents: null,
    pastEvents: null,
}

const eventsSlice = createSlice({
    name: "currentEvents",
    initialState,
    reducers: {
        setEvents(state, action: PayloadAction<Event[] | null>) {
            state.events = action.payload;
        },
        setUpcomingEvents(state, action: PayloadAction<Event[] | null>) {
            state.upcomingEvents = action.payload;
        },
        setPastEvents(state, action: PayloadAction<Event[] | null>) {
            state.pastEvents = action.payload;
        },
    }
});

export const { setEvents, setUpcomingEvents, setPastEvents } = eventsSlice.actions;
export default eventsSlice.reducer;