import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vendor } from "../../app/(app)/(vendor_files)/vendorInterface";

interface MarketplaceState {
    vendors: Vendor[] | null,
}

const initialState: MarketplaceState = {
    vendors: null,
}

const marketplaceSlice = createSlice({
    name: "vendorMarketplace",
    initialState,
    reducers: {
        setMarketplace(state, action: PayloadAction<Vendor[] | null>) {
            state.vendors = action.payload;
        }
    }
})

export const {setMarketplace} = marketplaceSlice.actions;
export default marketplaceSlice.reducer;