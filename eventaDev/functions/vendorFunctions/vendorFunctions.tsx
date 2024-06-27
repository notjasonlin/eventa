import { supabase } from '../../lib/supabase';
import { Vendor } from '../../interfaces/vendorInterface';
import { GenericVendor } from '../../interfaces/genericVendorInterface';

export const fetchVendors = async (): Promise<{ vendors: Vendor[], error: string | null }> => {
  const { data: vendors, error } = await supabase
    .from("marketplace")
    .select("*");

  if (error) {
    console.log("Error fetching vendor:", error);
    return { vendors: [], error: "Error fetching vendor" };
  }

  return { vendors, error: null };
};

export const addNewItem = async (vendorType: string): Promise<Vendor[] | null> => {
  const { data: vendors, error } = await supabase
    .from("marketplace")
    .insert([{ vendorType: vendorType }]);

  if (error) {
    console.log("Error adding vendor:", error);
    return null;
  }

  return vendors;
};

export const selectVendorByTypeAndID = async (vendorType: string, vendorID: string): Promise<GenericVendor[] | null> => {
  let { data: venue, error } = await supabase
    .from(vendorType)
    .select('*')
    .eq('id', vendorID);

  if (error) {
    console.error('Error fetching venue:', error);
  } else {
    console.log('Fetched venue:', venue);
    return venue;
  }
  return null;
}
