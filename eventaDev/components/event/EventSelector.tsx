import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/redux/store';
import { setEvents } from '../../store/redux/events';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Event } from '../../interfaces/eventInterface';
import { supabase } from '../../lib/supabase';
import { setEvent } from '../../store/redux/event';

type DropdownItem = {
    label: string;
    value: string;
};

const EventSelector: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const session = useSelector((state: RootState) => state.authentication.session);
    const events = useSelector((state: RootState) => state.currentEvents.events);
    // const [formData, setFormData] = useState<Event | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<DropdownItem[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (session) {
                const { data, error } = await supabase
                    .from("events")
                    .select("*")
                    .eq("userId", session.user.id);

                if (error) {
                    console.log("Error fetching events: ", error);
                } else if (data) {
                    dispatch(setEvents(data));
                    setItems(data.map((event: Event) => ({ label: event.eventName, value: event.id })));
                }
            }
        };

        fetchEvents();
    }, [session, dispatch]);

    // useEffect(() => {
    //     const fetchEventDetails = async () => {
    //         if (selectedEvent) {
    //             // console.log("Fetching details for selected event: ", selectedEvent.id);
    //             const { data, error } = await supabase
    //                 .from("events")
    //                 .select("*")
    //                 .eq("id", selectedEvent.id)
    //                 .single();

    //             if (error) {
    //                 console.log("Error fetching details: ", error);
    //             } else if (data) {
    //                 // console.log("Fetched event details: ", data);
    //                 setFormData(data);
    //             }
    //         }
    //     };

    //     fetchEventDetails();
    // }, [selectedEvent]);

    const handleChange = (eventValue: string | null) => {
        // console.log("Changing event selection to: ", eventValue);
        // setFormData(null); // Clear the form data before setting new event
        dispatch(setEvent(null)); // Clear the current selected event

        const event = events?.find(event => event.id === eventValue);
        if (event) {
            // dispatch(setSelectedEvent(event));
            dispatch(setEvent(event));
            setShowDropdown(false);
        }
    };

    const handleButtonClick = () => {
        setShowDropdown(true);
    };

    return (
        <View style={styles.container}>
            {!showDropdown && (
                <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
                    <Text style={styles.buttonText}>Select Event</Text>
                </TouchableOpacity>
            )}
            {showDropdown && (
                <Modal visible={true} transparent={true}>
                    <Pressable onPress={() => setShowDropdown(false)} style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            onChangeValue={handleChange}
                            placeholder="Select an event"
                            containerStyle={styles.dropdown}
                        />
                    </Pressable>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
    },
    dropdownContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dropdown: {
        height: 50,
        width: 300,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EventSelector;