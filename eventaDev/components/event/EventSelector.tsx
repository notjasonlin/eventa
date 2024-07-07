import React, { useEffect, useState, useCallback } from 'react';
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
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<DropdownItem[]>([]);

    const fetchEvents = useCallback(async () => {
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

                // Set the selected event
                const selectedEvent = data.find((event: Event) => event.selected);
                if (selectedEvent) {
                    dispatch(setEvent(selectedEvent));
                }
            }
        }
    }, [session, dispatch]);

    useEffect(() => {
        fetchEvents();
    }, [session, fetchEvents]);

    const handleChange = async (eventValue: string | null) => {
        if (session) {
            // Set all events to selected = false
            const { error: updateError1 } = await supabase
                .from('events')
                .update({ selected: false })
                .eq('userId', session.user.id);

            if (updateError1) {
                console.log("Error updating events: ", updateError1);
                return;
            }

            // Set the selected event to selected = true
            const { error: updateError2 } = await supabase
                .from('events')
                .update({ selected: true })
                .eq('id', eventValue)
                .eq('userId', session.user.id);

            if (updateError2) {
                console.log("Error updating selected event: ", updateError2);
                return;
            }

            // Fetch updated events
            await fetchEvents();
            setShowDropdown(false); // Close dropdown after selecting an event
        }
    };

    const handleButtonClick = async () => {
        await fetchEvents();
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
                    <Pressable style={styles.overlay} onPress={() => setShowDropdown(false)}>
                        <View style={styles.dropdownContainer}>
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
                        </View>
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
        zIndex: 1, // Ensure this component is above others
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    dropdownContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdown: {
        width: '100%',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EventSelector;