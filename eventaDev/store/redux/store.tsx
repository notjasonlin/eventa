import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth";
import vendorReducer from "./vendor";
import eventsReducer from "./events";
import eventReducer from "./event";
import marketplaceReducer from "./marketplace";
import budgetReducer from "./budget";
import checklistReducer from './checklist'; // Import the checklist reducer


export const store = configureStore({
    reducer: {
        authentication: authReducer,
        currentVendor: vendorReducer,
        currentEvents: eventsReducer,
        selectedEvent: eventReducer,
        vendorMarketplace: marketplaceReducer,
        budgetSystem: budgetReducer,
        checklistSystem: checklistReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
