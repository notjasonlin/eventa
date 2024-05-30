import { Link } from "expo-router";
import { Text, View } from "react-native";
import StyleButton from "../../../components/Buttons/StyleButton";
import { grabEmail } from "../../../functions/grabEmail";
import { uploadFromImages } from "../../../functions/photos/uploadFromImages";

export const HomePage = () => {
  let email = grabEmail();

  

  return (
    <View>
      <Text>Home Page</Text>
      <Text>{email}</Text>
      <StyleButton onPress={uploadFromImages}>Add image!</StyleButton>
      <Link href="/users/1">Go to user 1</Link>
      <Link href="/users/2">Go to user 2</Link>
      <Link href="/vendors/fetchVendor">Go to Marketplace</Link>
      <Link href="/checklist/1">Go to checklist 1</Link>
    </View>
  );
}

export default HomePage;
