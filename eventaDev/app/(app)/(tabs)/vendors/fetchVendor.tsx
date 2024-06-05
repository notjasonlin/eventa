import { supabase } from "../../../../lib/supabase";
import { useEffect, useState } from "react";
import { Pressable, Text, View, FlatList, StyleSheet } from "react-native";

// Component imports
import VendorCard from "../../../../components/vendorCard";
import VendorModal from "../../../../components/vendorModal";

// Define the type for the vendor
interface Vendor {
  id: number;
  vendorType: string;
}

const FetchVendor = () => {
  const [fetchError, setFetchError] = useState<String | null>(null);
  const [vendorTypes, setVendorTypes] = useState<Vendor[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const Fetch = async () => {
    const { data: vendors, error } = await supabase
      .from("marketplace")
      .select("*");

    if (error) {
      setFetchError("Error fetching vendor");
      console.log("Error fetching vendor:", error);
    } else {
      setVendorTypes(vendors);
      setFetchError(null);
      console.log(vendors);
      console.log("Vendor fetched successfully");
    }
  };

 const addNewItem = async (vendorType: string) => {
    const { data: vendors, error } = await supabase
      .from("marketplace")
      .insert([{ vendorType: vendorType }]);
    
    if (error) {
      console.log("Error adding vendor:", error);
      return null;
    }
    return vendors;
  };


  const saveVendorType = (vendorType: string) => {
    addNewItem(vendorType)
      .then(() => {
        Fetch()
      })
      .catch((error) => {
        console.log("Error saving vendor:", error);
      });
  };

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <View style={styles.container}>
      {fetchError && <Text>{fetchError}</Text>}
      {!fetchError &&
        vendorTypes.length > 0 &&
        <FlatList
          data={vendorTypes}
          keyExtractor={(vendorType) => vendorType.id.toString()} // Ensures the key is a string
          renderItem={({ item }) => <VendorCard vendor={item} />}
          numColumns={2}
        />
      }
      {/* <Pressable onPress={() => setShowModal(true)}>
        <Text>Add Vendor</Text>
      </Pressable>
      {showModal ? <VendorModal saveNewVendor={saveVendorType} hideModal={() => setShowModal(false)} /> : null} */}
    </View>
  );
};

export default FetchVendor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0", // Optional: adds a background color
  },
});