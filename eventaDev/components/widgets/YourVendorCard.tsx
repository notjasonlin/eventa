import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from "react-native";
import { Cost } from "../../interfaces/costInterface";
import { Link } from "expo-router";
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { selectVendorByTypeAndID } from '../../functions/vendorFunctions/vendorFunctions';
import { GenericVendor } from '../../interfaces/genericVendorInterface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/redux/store';
import { setPackageCost, setPackageEventID } from '../../store/redux/budget';

type YourVendorCardProps = {
    vendors: Cost[] | null,
    type: string,
}

const YourVendorCard = ({ vendors, type }: YourVendorCardProps) => {
    const DEFAULT_IMAGE = { uri: `https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/public/marketplace/${type}/default.png` };
    const event = useSelector((state: RootState) => state.selectedEvent.event);
    const booked = vendors?.filter((vendor) => vendor.vendorID !== null);
    const [vendor, setVendor] = useState<GenericVendor | null>(null);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        const grabVendor = async () => {
            try {
                if (booked && booked.length > 0) {
                    const data = await selectVendorByTypeAndID(booked[0].vendorType, booked[0].vendorID);
                    if (data) {
                        setVendor(data[0]);
                    }
                }
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };
        grabVendor();
    }, [booked && booked[0]?.vendorID]);

    const setCostPackage = () => {
        if (booked && booked[0] && event) {
            dispatch(setPackageCost(booked[0]));
            dispatch(setPackageEventID(event?.id));
        }
    }

    return (
        <>
            {(booked && booked.length > 0 && vendor) ?
                <Link href={"/(tabs)/budget/[budgetid].tsx"} asChild>
                    <TouchableOpacity style={styles.card} onPress={setCostPackage}>
                        <ImageBackground source={DEFAULT_IMAGE} style={styles.imageBackground}>
                            <LinearGradient
                                colors={['#00000000', '#000000']}
                                style={{ height: '100%', width: '100%' }}
                                start={{ x: 0.5, y: 0.5 }}
                                end={{ x: 0.5, y: 1 }} />

                            <View style={styles.bookedContainer}>
                                <Text style={styles.bookedText}>Booked!</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.vendorTypeText}>{vendor.name}</Text>
                            </View>

                        </ImageBackground>
                    </TouchableOpacity>
                </Link>
                :
                <Link href={{ pathname: "(vendor_files)/VendorTypePage", params: { type: type, title: type.charAt(0).toUpperCase() + type.slice(1) } }} asChild>
                    <TouchableOpacity style={styles.card} onPress={() => {
                        if (event) dispatch(setPackageEventID(event?.id))
                    }}>
                        <LinearGradient
                            colors={['#49936F', '#356a50', '#000000']}
                            style={styles.gradient}
                        >
                            <FontAwesome6 name="plus" size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
            }
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
        borderRadius: 8,
        width: 95,
        height: 95,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    bookedContainer: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 75,
        height: 75,
        backgroundColor: '#3f7e5f',
        justifyContent: 'flex-end', // Align items at the bottom
        alignItems: 'flex-start', // Align items to the left
        transform: [{ rotate: '45deg' }],
        zIndex: 1,
    },
    bookedText: {
        right: -15,
        fontSize: 12,
        color: '#fff',
        transform: [{ rotate: "0deg" }],
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    vendorTypeText: {
        fontSize: 16,
        color: '#fff',
    },
    gradient: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    imageBackground: {
        width: 95,
        height: 95,
        resizeMode: "cover",
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 10,
        overflow: "hidden",
    },
});

export default YourVendorCard;
