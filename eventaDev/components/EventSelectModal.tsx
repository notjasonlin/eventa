import { Modal, Pressable, View, Text, StyleSheet, ScrollView } from "react-native";
import { Event } from "../app/(app)/(event_files)/eventInterface";
import EventCard from "./EventCard";


type EventSelectorModalProps = {
    select: (event: Event) => void
    hideModal: () => void
    upcomingEvents: Event[]
}

const EventSelectModal = ({ select, hideModal, upcomingEvents }: EventSelectorModalProps) => {
    return (
        <Modal animationType="fade" visible={true} transparent={true}>
            <Pressable onPress={hideModal} style={styles.modalBackDrop}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select an Event</Text>
                    <View style={styles.eventsContainer}>
                        <ScrollView>
                            {upcomingEvents.map(event => (
                                <EventCard key={event.id} event={event} onPress={() => select(event)} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

export default EventSelectModal;

const styles = StyleSheet.create({
    modalBackDrop: {
        flex: 1,
        backgroundColor: "#000000aa",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    eventsContainer: {
        marginVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
})