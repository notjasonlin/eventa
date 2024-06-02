import { View, Text } from "react-native";

const EventCard = ({ event }) => {
  return (
    <View>
      <Text>{event.eventName}</Text>
      <Text>{event.vendorType}</Text>
    </View>
  );
};

export default EventCard;
