import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { supabase } from "../../../lib/supabase";
import { useEffect, useLayoutEffect, useState } from "react";
import { GenericVendor } from "../../../interfaces/genericVendorInterface";
import VendorBar from "../../../components/vendor/VendorBar";

const VendorTypePage = () => {
    const [fetchError, setFetchError] = useState<boolean | null>(null);
    const [vendors, setVendors] = useState<GenericVendor[]>([]);
    const { type, title } = useLocalSearchParams();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation]);

    const Fetch = async () => {
        if (typeof (type) === "string") { // Hate this appraoch
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
        <View style={{ alignContent: "center", flex: 1 }}>
            {vendors && <FlatList
                data={vendors}
                keyExtractor={(vendor) => vendor.id.toString()} // Ensures the key is a string
                renderItem={({ item }) => {
                    if (typeof(type) === "string") return <VendorBar vendor={item} type={type} /> // Hate this appraoch
                    else return <Text>Invalid type</Text>
                }}
            />}
        </View>
    );
}

export default VendorTypePage;