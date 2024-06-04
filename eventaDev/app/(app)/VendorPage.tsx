import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useEffect, useLayoutEffect, useState } from "react";

const VendorPage = () => {
    const [fetchError, setFetchError] = useState(null);
    const [vendors, setVendors] = useState([]);
    const { type, title } = useLocalSearchParams();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation]);

    const Fetch = async () => {
        if (typeof (type) === "string") {
            const { data: vendorsData, error } = await supabase
                .from(type)
                .select("*");

            if (error) {
                setFetchError(true);
                console.log("Error fetching vendor data");
            } else {
                setVendors(vendorsData);
                setFetchError(false);
                console.log("Vendor data fetched successfully");
            }

            console.log(vendorsData);
        } else {
            console.error("Invalid vendor");
        }
    }

    useEffect(() => {
        Fetch();
    }, []);

    return (
        <View style={{ alignContent: "center" }}>
            {vendors && <FlatList
                data={vendors}
                keyExtractor={(vendor) => vendor.id.toString()} // Ensures the key is a string
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />}
        </View>
    );
}

export default VendorPage;