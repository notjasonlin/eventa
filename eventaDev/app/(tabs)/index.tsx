import { Link } from "expo-router";
import { Text, View } from "react-native";

const StartPage = () => {
  return (


    <View>
      <Text>Home Page</Text>
      <Link href="/users/1">Go to user 1</Link>
      <Link href="/users/2">Go to user 2</Link>
      <Link href="/vendors/fetchVendor">Go to Marketplace</Link>
      <Link href="/checklist/1">Go to checklist 1</Link>
    </View>
  );
};

export default StartPage;
