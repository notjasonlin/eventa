import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";
import { View, Text, StyleSheet } from "react-native";

const EventDisplay = () => {
    const selectedEvent = useSelector((state: RootState) => state.selectedEvent.event);

    return (
        <>
            {selectedEvent && (
                <View style={styles.eventDetails}>
                    <Text style={styles.eventDetailText}>Name: {selectedEvent?.eventName}</Text>
                    <Text style={styles.eventDetailText}>Date: {selectedEvent?.eventDate}</Text>
                    <Text style={styles.eventDetailText}>Time: {selectedEvent?.eventTime}</Text>
                    <Text style={styles.eventDetailText}>Location: {selectedEvent?.location}</Text>
                    <Text style={styles.eventDetailText}>Description: {selectedEvent?.description}</Text>
                </View>
            )}
        </>
    );
}

export default EventDisplay;

const styles = StyleSheet.create({
    eventDetails: {
        marginTop: 20,
    },
    eventDetailText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
    },
})