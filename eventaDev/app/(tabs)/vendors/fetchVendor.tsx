import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

//component
import VendorCard from "./vendorCard";

const FetchVendor = () => {
  const [fetchError, setFetchError] = useState(null);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const Fetch = async () => {
      const { data: vendors, error } = await supabase.from("marketplace").select('*');

      if (error) {
        setFetchError(true);
        console.log("Error fetching vendor");
      } else {
        setVendors(vendors);
        setFetchError(false);
        console.log("Vendor fetched successfully");
      }
    };

    Fetch();
  }, []);

  return (
    <View>
      {fetchError && (<Text>Error fetching vendor</Text>)}
      {!fetchError && vendors.length > 0 && (
        vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))
      )}
    </View>
  );
};

export default FetchVendor;
