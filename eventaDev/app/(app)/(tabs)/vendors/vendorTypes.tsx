// app/(app)/(tabs)/vendor/FetchVendor.tsx
import { useEffect, useState } from "react";
import { Pressable, Text, View, FlatList, StyleSheet } from "react-native";

// Component imports
import VendorCard from "../../../../components/vendor/vendorCard";
import VendorModal from "../../../../components/vendor/vendorModal";
import { fetchVendors, addNewItem } from "../../../../functions/vendorFunctions";
import { Vendor } from "../../(vendor_files)/vendorInterface";

const FetchVendor = () => {
  const [fetchError, setFetchError] = useState<String | null>(null);
  const [vendorTypes, setVendorTypes] = useState<Vendor[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const Fetch = async () => {
    const { vendors, error } = await fetchVendors();

    if (error) {
      setFetchError(error);
    } else {
      setVendorTypes(vendors);
      setFetchError(null);
    }
  };

  const saveVendorType = (vendorType: string) => {
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
