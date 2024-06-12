import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth";
import vendorReducer from "./vendor";
import eventsReducer from "./events";
import eventReducer from "./event";

export const store = configureStore({
    reducer: {
        authentication: authReducer,
        currentVendor: vendorReducer,
        currentEvents: eventsReducer,
        selectedEvent: eventReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
