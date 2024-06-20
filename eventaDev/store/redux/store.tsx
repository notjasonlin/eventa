import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth";
import vendorReducer from "./vendor";
import eventsReducer from "./events";
import eventReducer from "./event";
import marketplaceReducer from "./marketplace";

export const store = configureStore({
    reducer: {
        authentication: authReducer,
        currentVendor: vendorReducer,
        currentEvents: eventsReducer,
        selectedEvent: eventReducer,
        vendorMarketplace: marketplaceReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
