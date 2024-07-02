import { supabase } from '../../lib/supabase';

export const bookVendor = async (vendorID: string, eventID: string, vendorType: string, cost: number) => {

    const { data, error } = await supabase
        .from('bookedVendors')
        .insert([
            { vendorID: vendorID, eventID: eventID, vendorType: vendorType, inBudget: false, cost: cost },
        ])

    if (error) {
        console.error("Error booking vendor: " + error);
    }

}

export const selectBookedVendor = async (vendorID: string, eventID: string, vendorType: string) => {
    let { data, error } = await supabase
        .from('bookedVendors')
        .select('vendorID, eventID, vendorType')
        .eq('vendorID', vendorID)
        .eq('eventID', eventID)
        .eq('vendorType', vendorType);

    if (error) {
        console.error("Error booking vendor: " + error);
    }

    // console.log(data);

    return data;
}

export const readBookedVendorByEvent = async (eventID: string) => {
    let { data, error } = await supabase
        .from('bookedVendors')
        .select('vendorID, eventID, vendorType')
        .eq('eventID', eventID)

    if (error) {
        console.error("Error booking vendor: " + error);
    }

    // console.log(data);

    return data;
}


export const removeBookedVendor = async (vendorID: string, eventID: string) => {
    const { error } = await supabase
        .from('bookedVendors')
        .delete()
        .eq('vendorID', vendorID)
        .eq('eventID', eventID)

    if (error) {
        console.error("Error booking vendor: " + error);
    }
}

export const setBookedVendorInBudget = async (vendorID: string, eventID: string, inBudget: boolean) => {
    let { data, error } = await supabase
        .from('bookedVendors')
        .update({ "inBudget": inBudget })
        .eq('vendorID', vendorID)
        .eq('eventID', eventID)

    if (error) {
        console.error("Error booking vendor: " + error);
    }
}

export const fetchBookedVendorsNotInBudget = async (eventID: string) => {
    let { data, error } = await supabase
        .from('bookedVendors')
        .select('vendorID, eventID, vendorType, cost')
        .eq('eventID', eventID)
        .eq('inBudget', false)

    // console.log(data);

    if (error) {
        console.error("Error booking vendor: " + error);
    } else {
        return data;
    }
}