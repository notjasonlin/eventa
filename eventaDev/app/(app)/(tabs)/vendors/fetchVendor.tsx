import { supabase } from "../../../../lib/supabase";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

// Component imports
import VendorCard from "../../../../components/vendorCard";
import VendorModal from "../../../../components/vendorModal";

// Define the type for the vendor
interface Vendor {
  id: number;
  vendorType: string;
}

const FetchVendor = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [showModal, setShowModal] = useState(false);

  const Fetch = async () => {
    const { data, error } = await supabase
      .from("marketplace")
      .select("*");

    if (error) {
      setFetchError("Error fetching vendor");
      console.log("Error fetching vendor:", error);
    } else {
      setVendors(data as Vendor[]);
      setFetchError(null);
      console.log("Vendor fetched successfully");
    }
  };

  const addNewItem = async (vendorType: string) => {
    const { data, error } = await supabase
      .from("marketplace")
      .insert([{ vendorType }]);

    if (error) {
      console.log("Error adding vendor:", error);
      return null;
    }

    return data as unknown as Vendor[];
  };

  const saveVendor = (vendorType: string) => {
    addNewItem(vendorType)
      .then(() => {
        Fetch();
      })
      .catch((error) => {
        console.log("Error saving vendor:", error);
      });
  };

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <View>
      {fetchError && <Text>{fetchError}</Text>}
      {!fetchError &&
        vendors.length > 0 &&
        vendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
      <Pressable onPress={() => setShowModal(true)}>
        <Text>Add Vendor</Text>
      </Pressable>
      {showModal ? (
        <VendorModal saveNewVendor={saveVendor} hideModal={() => setShowModal(false)} />
      ) : null}
    </View>
  );
};

export default FetchVendor;
