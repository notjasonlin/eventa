import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const UserPage = () => {
  const { budgetid } = useLocalSearchParams<{budgetid: string}>();

  return (
    <View>
      <Text>Budget - {budgetid}</Text>
    </View>
  );
};

export default UserPage;
