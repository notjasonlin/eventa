import { supabase } from '../lib/supabase';
import { Vendor } from '../app/(app)/(vendor_files)/vendorInterface';

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
