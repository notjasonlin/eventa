import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../interfaces/contactInterface';
import { MMKVInstance } from "react-native-mmkv-storage";


interface ContactsState {
  // contacts: Contact[];
  // withProfile: Contact[];
  // withoutProfile: Contact[];
  cacheStore: MMKVInstance | null
  contents: string
}

const initialState: ContactsState = {
  // contacts: [],
  // withProfile: [],
  // withoutProfile: [],
  cacheStore: null,
  contents: "",
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // addContactWPrf(state, action: PayloadAction<Contact>) {
    //   state.contacts = [...state.contacts, action.payload];
    //   state.withProfile = [...state.withProfile, action.payload];
    // },
    // addContactWOPrf(state, action: PayloadAction<Contact>) {
    //   state.contacts = [...state.contacts, action.payload];
    //   state.withoutProfile = [...state.withoutProfile, action.payload];
    // },
    setCache(state, action: PayloadAction<MMKVInstance | null>) {
      state.cacheStore = action.payload;
    },
    setContents(state, action: PayloadAction<string>) {
      state.contents = action.payload;
    }
  },
});

export const { setCache, setContents} = contactsSlice.actions; // addContactWPrf, addContactWOPrf,
export default contactsSlice.reducer;
