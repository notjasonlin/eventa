import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const UserPage = () => {
  const { budgetid } = useLocalSearchParams<{budgetid: string}>();

  return (
    <View>
      <Text>Checklist - {budgetid}</Text>
    </View>
  );
};

export default UserPage;
