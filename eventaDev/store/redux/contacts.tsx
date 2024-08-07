import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../interfaces/contactInterface";
import { Profile } from "../../interfaces/profileInterface";

interface UserContactsState {
  contacts: Contact[];
  withProfile: Contact[];
  withoutProfile: Contact[];
}

const initialState: UserContactsState = {
  contacts: [],
  withProfile: [],
  withoutProfile: [],
};

const contactsSlice = createSlice({
  name: "userContacts",
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) {
      state.contacts = action.payload;
    },
    addContactWPrf(state, action: PayloadAction<Contact>) {
      state.contacts.concat(action.payload);
      state.withProfile.concat(action.payload);
    },
    addContactWOPrf(state, action: PayloadAction<Contact>) {
      state.contacts.concat(action.payload);
      state.withoutProfile.concat(action.payload);
    },
  }
});

export const { setContacts, addContactWPrf, addContactWOPrf } = contactsSlice.actions;
export default contactsSlice.reducer;

