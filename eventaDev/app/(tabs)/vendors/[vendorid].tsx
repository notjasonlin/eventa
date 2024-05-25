import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const UserPage = () => {
  const { vendorid } = useLocalSearchParams<{vendorid: string}>();

  return (
    <View>
      <Text>Vendor - {vendorid}</Text>
    </View>
  );
};

export default UserPage;
