import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../interfaces/contactInterface";

interface UserContactsState {
  contacts: Contact[] | null;
}

const initialState: UserContactsState = {
  contacts: null,
};

const contactsSlice = createSlice({
  name: "userContacts",
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[] | null>) {
      state.contacts = action.payload;
    },
  },
});

export const { setContacts } = contactsSlice.actions;
export default contactsSlice.reducer;

