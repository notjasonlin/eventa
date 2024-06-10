import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../app/(app)/(event_files)/eventInterface";

interface EventsState {
    events: Event[] | null;
}

const initialState: EventsState = {
    events: null,
}

const eventSlice = createSlice({
    name: "currentEvents",
    initialState,
    reducers: {
        setEvents(state, action: PayloadAction<Event[] | null>) {
            state.events = action.payload;
        },
    }
});

export const { setEvents } = eventSlice.actions;
export default eventSlice.reducer;