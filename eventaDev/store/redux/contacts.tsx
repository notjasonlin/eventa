import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from './contactInterface';

interface ContactsState {
  contacts: Contact[];
  withProfile: Contact[];
  withoutProfile: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
  withProfile: [],
  withoutProfile: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContactWPrf(state, action: PayloadAction<Contact>) {
      state.contacts = [...state.contacts, action.payload];
      state.withProfile = [...state.withProfile, action.payload];
    },
    addContactWOPrf(state, action: PayloadAction<Contact>) {
      state.contacts = [...state.contacts, action.payload];
      state.withoutProfile = [...state.withoutProfile, action.payload];
    },
  },
});

export const { addContactWPrf, addContactWOPrf } = contactsSlice.actions;
export default contactsSlice.reducer;
