import { supabase } from "../../../../lib/supabase";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

//component
import VendorCard from "../../../../components/vendorCard";
import VendorModal from "../../../../components/vendorModal";

const FetchVendor = () => {
  const [fetchError, setFetchError] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const Fetch = async () => {
    const { data: vendors, error } = await supabase
      .from("marketplace")
      .select("*");

    if (error) {
      setFetchError(true);
      console.log("Error fetching vendor");
    } else {
      setVendors(vendors);
      setFetchError(false);
      console.log("Vendor fetched successfully");
    }
  };

  const addNewItem = async (vendor) => {
    const { data: vendors, error } = await supabase
      .from("marketplace")
      .insert([{ vendorType: vendor }]);

    return vendors
  };

  const saveVendor = (vendor) => {
    addNewItem(vendor)
    .then(() => {
      Fetch()
    })
  };

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <View>
      {fetchError && <Text>Error fetching vendor</Text>}
      {!fetchError &&
        vendors.length > 0 &&
        vendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
      <Pressable onPress={() => setShowModal(true)}>
        <Text>Add Vendor</Text>
      </Pressable>
      {showModal ? <VendorModal saveNewVendor={saveVendor} hideModal={() => setShowModal(false)} /> : null}
    </View>
  );
};

export default FetchVendor;
