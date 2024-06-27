import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/redux/store";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { bookVendor, selectBookedVendor } from '../../../functions/vendorFunctions/bookedVendorFunctions';
import EventSelectModal from '../../../components/event/EventSelectModal';
import { Event } from '../../../interfaces/eventInterface';
import { useRouter } from 'expo-router';
import { fetchEvents } from '../../../functions/eventFunctions/eventFunctions';
import { setUpcomingEvents } from '../../../store/redux/events';
import { costChangeTrigger } from '../../../store/redux/budget';

const SingleVendor = () => {
    const vendor = useSelector((state: RootState) => state.currentVendor.vendor);
    const upcomingEvents = useSelector((state: RootState) => state.currentEvents.upcomingEvents);
    const session = useSelector((state: RootState) => state.authentication.session);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const trigger = useSelector((state: RootState) => state.budgetSystem.costTrigger);


    const DEFAULT_IMAGE = { uri: `https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/public/marketplace/venues/default.png` };

    useEffect(() => {
        if (!upcomingEvents) {
            if (session) {
                fetchEvents(session.user.id)
                    .then(({ upcomingEvents }) => {
                        dispatch(setUpcomingEvents(upcomingEvents));
                    })
                    .catch(error => setFetchError(error.message));
            } else {
                console.error("Session is null!");
            }
        } else {
            console.log("Upcoming Events rendered!");
        }
    }, [session, upcomingEvents]);


    useEffect(() => {
        if (showModal && (!upcomingEvents || upcomingEvents.length === 0)) {

            if (upcomingEvents) console.log(upcomingEvents.length)

            Alert.alert(
                "No existing events",
                "Want to create an event?",
                [
                    {
                        text: "Create Event",
                        onPress: () => router.push("(event_files)/eventForm"),
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Operation canceled"),
                        style: "cancel",
                    },
                ]
            );
            setShowModal(false);
        }
    }, [showModal, upcomingEvents]);


    const handleBook = async (event: Event) => {
        const book = async () => {
            if (vendor?.id !== undefined) {
                // console.log("ID " + event.id);
                const booking = await selectBookedVendor(vendor.id, event.id, vendor.vendorType)
                if (booking && booking.length > 0) {
                    Alert.alert(`Already booked ${vendor?.name} for ${event.eventName}`)
                } else {
                    await bookVendor(vendor.id, event.id, vendor.vendorType);
                    dispatch(costChangeTrigger());
                    // console.log("Trigger", trigger);
                    setShowModal(false);
                }
            }
        }

        Alert.alert(`Book ${vendor?.name} for ${event.eventName}?`, "", [
            {
                text: "Book",
                onPress: book,
            },
            {
                text: "Cancel",
                onPress: () => console.log("Operation canceled"),
                style: "cancel",
            },
        ])
    }

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
                <TouchableOpacity style={styles.bookButton} onPress={() => setShowModal(true)}>
                    <Text style={styles.bookButtonText}>Book now!</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Capacity</Text>
                <Text style={styles.infoText}>Cost</Text>
            </View>
            <Text style={styles.descriptionText}>Description</Text>
            <Text style={styles.policyText}>Policy</Text>
            {showModal && upcomingEvents && upcomingEvents.length > 0 && (
                <EventSelectModal select={handleBook} hideModal={() => setShowModal(false)} upcomingEvents={upcomingEvents} />)
            }
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
