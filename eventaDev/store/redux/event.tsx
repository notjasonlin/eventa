import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../interfaces/eventInterface";
import { BookedVendor } from "../../interfaces/bookedVendorInterface";
import { GenericVendor } from "../../interfaces/genericVendorInterface";

interface SelectedEventState {
    event: Event | null,
    bookedVendors: BookedVendor[] | null,
    venues: GenericVendor[] | null,
    catering: GenericVendor[] | null,
    photographers: GenericVendor[] | null,
    entertainment: GenericVendor[] | null,
    decoration: GenericVendor[] | null,
}

const initialState: SelectedEventState = {
    event: null,
    bookedVendors: null,
    venues: null,
    catering: null,
    photographers: null,
    entertainment: null,
    decoration: null,
}

const eventSlice = createSlice({
    name: "selectedEvent",
    initialState,
    reducers: {
        setEvent(state, action: PayloadAction<Event | null>) {
            state.event = action.payload;
        },
        setBookedVendors(state, action: PayloadAction<BookedVendor[] | null>) {
            state.bookedVendors = action.payload;
        },
        setVenues(state, action: PayloadAction<GenericVendor[] | null>) {
            state.venues = action.payload;
        },
        setCatering(state, action: PayloadAction<GenericVendor[] | null>) {
            state.catering = action.payload;
        },
        setPhotographers(state, action: PayloadAction<GenericVendor[] | null>) {
            state.photographers = action.payload;
        },
        setEntertainment(state, action: PayloadAction<GenericVendor[] | null>) {
            state.entertainment = action.payload;
        },
        setDecoration(state, action: PayloadAction<GenericVendor[] | null>) {
            state.decoration = action.payload;
        },
    }
})

export const {setEvent, setBookedVendors, setVenues, setCatering, 
    setPhotographers, setEntertainment, setDecoration} = eventSlice.actions;
export default eventSlice.reducer;