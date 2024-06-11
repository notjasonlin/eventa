import { supabase } from '../lib/supabase';

interface bookVendorTypes {
    vendorID: string;
    eventID: string;
    vendorType: string;
}

export const bookVendor = async ({ vendorID, eventID, vendorType }: bookVendorTypes) => {
    const { data, error } = await supabase
        .from('bookedVendors')
        .insert([
            { vendorID: 'someValue', eventID: 'otherValue', vendorType: "" },
        ])
        .select()

    if(error) {
        console.error("Error booking vendor: " + error);
    }

}