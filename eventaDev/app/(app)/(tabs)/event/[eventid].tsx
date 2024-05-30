import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const UserPage = () => {
  const { eventid } = useLocalSearchParams<{eventid: string}>();

  return (
    <View>
      <Text>Create an Event - {eventid}</Text>
    </View>
  );
};

export default UserPage;
