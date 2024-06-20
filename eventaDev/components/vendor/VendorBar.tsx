import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { GenericVendor } from "../../app/(app)/(vendor_files)/genericVendorInterface";
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/redux/store';
import { setVendor } from '../../store/redux/vendor';

const VendorBar = ({ vendor, type }: { vendor: GenericVendor, type: string }) => {
    const DEFAULT_IMAGE = { uri: `https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/public/marketplace/${type}/default.png` };
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    let vendorRedux = useSelector((state: RootState) => state.currentVendor.vendor);


    const handleSelectVendor = () => {
        console.log("Vendor: " + vendorRedux);
        dispatch(setVendor(vendor));
        router.push("(vendor_files)/SingleVendor");
    }

    return (
        < TouchableOpacity style={styles.container} onPress={handleSelectVendor}>
            <View style={styles.row}>
                <Image source={DEFAULT_IMAGE} style={styles.image} />
                <View style={styles.textContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.vendorName}>{vendor.name}</Text>
                        {vendor.verified && <Feather name="check-circle" size={16} color="#60d8ba" style={{ paddingLeft: 4, paddingTop: 4 }} />}
                    </View>
                    <Text>Description</Text>
                    <Text>Capacity</Text>
                </View>
            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
        height: 140,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        marginRight: 10,
    },
    textContainer: {
        justifyContent: 'center',
    },
    vendorName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    verified: {
        fontSize: 14,
        color: 'green',
        marginTop: 4,
    },
});

export default VendorBar;
