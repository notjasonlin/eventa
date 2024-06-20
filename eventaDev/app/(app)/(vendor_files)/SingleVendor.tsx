import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/redux/store";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

const SingleVendor = () => {
    const vendor = useSelector((state: RootState) => state.currentVendor.vendor);
    const DEFAULT_IMAGE = { uri: `https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/public/marketplace/venues/default.png` };

    return (
        <View style={styles.container}>
            <Text style={styles.vendorName}>{vendor?.name}</Text>
            <View style={styles.verifiedContainer}>
                {vendor && vendor.verified && (
                    <Text style={styles.verifiedText}>Eventa Verified</Text>
                )}
                {vendor && vendor.verified && (
                    <Feather name="check-circle" size={16} color="#60d8ba" style={styles.verifiedIcon} />
                )}
            </View>
            <Image source={DEFAULT_IMAGE} style={styles.vendorImage} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.bookButton} onPress={() => console.log("Pressed")}>
                    <Text style={styles.bookButtonText}>Book now!</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Capacity</Text>
                <Text style={styles.infoText}>Cost</Text>
            </View>
            <Text style={styles.descriptionText}>Description</Text>
            <Text style={styles.policyText}>Policy</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flex: 1,
    },
    vendorName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    verifiedText: {
        color: "#60d8ba",
        fontSize: 16,
    },
    verifiedIcon: {
        paddingLeft: 4,
        paddingTop: 4,
    },
    vendorImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        alignItems: "center",
    },
    bookButton: {
        backgroundColor: '#60d8ba',
        padding: 10,
        borderRadius: 5,
        width: 150,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: "center",
    },
    descriptionText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    policyText: {
        fontSize: 16,
        color: '#333',
    },
});

export default SingleVendor;
