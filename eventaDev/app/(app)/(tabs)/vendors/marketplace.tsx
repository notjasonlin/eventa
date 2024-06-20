// app/(app)/(tabs)/vendor/FetchVendor.tsx
import { useEffect, useState } from "react";
import { Pressable, Text, View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/redux/store";
import { setMarketplace } from "../../../../store/redux/marketplace";

// Component imports
import VendorCard from "../../../../components/vendor/vendorCard";
import VendorModal from "../../../../components/vendor/vendorModal";
import { fetchVendors, addNewItem } from "../../../../functions/vendorFunctions";

const Marketplace = () => {
  const [fetchError, setFetchError] = useState<String | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const marketplace = useSelector((state: RootState) => state.vendorMarketplace.vendors);

  const Fetch = async () => {
    const { vendors, error } = await fetchVendors();

    if (error) {
      setFetchError(error);
    } else {
      dispatch(setMarketplace(vendors));
      setFetchError(null);
    }
  };

  // const saveVendorType = (vendorType: string) => {
  //   addNewItem(vendorType)
  //     .then(() => {
  //       Fetch();
  //     })
  //     .catch((error) => {
  //       console.log("Error saving vendor:", error);
  //     });
  // };

  useEffect(() => {
    if(!marketplace) {
      Fetch();
    }
  }, []);

  return (
    <View style={styles.container}>
      {fetchError && <Text>{fetchError}</Text>}
      {!fetchError && marketplace &&
        marketplace.length > 0 &&
        <FlatList
          data={marketplace}
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

export default Marketplace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0", // Optional: adds a background color
  },
});
