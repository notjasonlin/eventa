import { supabase } from "../../../../lib/supabase";
import { useEffect, useState } from "react";
import { Pressable, Text, View, FlatList, StyleSheet } from "react-native";

//component
import VendorCard from "../../../../components/vendorCard";
import VendorModal from "../../../../components/vendorModal";

const FetchVendor = () => {
  const [fetchError, setFetchError] = useState(null);
  const [vendorTypes, setVendorTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const Fetch = async () => {
    const { data: vendors, error } = await supabase
      .from("marketplace")
      .select("*");

    if (error) {
      setFetchError(true);
      console.log("Error fetching vendor");
    } else {
      setVendorTypes(vendors);
      setFetchError(false);
      console.log("Vendor fetched successfully");
    }
  };

  const addNewItem = async (vendorType) => {
    const { data: vendors, error } = await supabase
      .from("marketplace")
      .insert([{ vendorType: vendorType }]);

    return vendors
  };

  const saveVendorType = (vendorType) => {
    addNewItem(vendorType)
      .then(() => {
        Fetch()
      })
  };

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <View style={styles.container}>
      {fetchError && <Text>Error fetching vendor</Text>}
      {!fetchError &&
        vendorTypes.length > 0 &&
        <FlatList
          data={vendorTypes}
          keyExtractor={(vendorType) => vendorType.id.toString()} // Ensures the key is a string
          renderItem={({ item }) => <VendorCard vendor={item} />}
          numColumns={2}
        />
      }
      <Pressable onPress={() => setShowModal(true)}>
        <Text>Add Vendor</Text>
      </Pressable>
      {showModal ? <VendorModal saveNewVendor={saveVendorType} hideModal={() => setShowModal(false)} /> : null}
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
  list: {
    justifyContent: "center",
    alignItems: "center",
  },
});