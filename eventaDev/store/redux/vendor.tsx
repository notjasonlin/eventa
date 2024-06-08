import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenericVendor } from "../../app/(app)/(vendor_files)/genericVendorInterface";

interface VendorState {
    vendor: GenericVendor | null;
}

const initialState: VendorState = {
    vendor: null
}

const vendorSlice = createSlice({
    name: "currentVendor",
    initialState,
    reducers: {
        setVendor(state, action: PayloadAction<GenericVendor | null>) {
            state.vendor = action.payload;
        },
    }
})

export const { setVendor } = vendorSlice.actions;
export default vendorSlice.reducer;