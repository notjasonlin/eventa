import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const UserPage = () => {
  const { checklistid } = useLocalSearchParams<{checklistid: string}>();

  return (
    <View>
      <Text>Checklist - {checklistid}</Text>
    </View>
  );
};

export default UserPage;
