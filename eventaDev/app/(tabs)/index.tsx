import { Link } from "expo-router";
import { Text, View } from "react-native";
import StyleButton from "../../components/Buttons/StyleButton";
import * as ImagePicker from 'expo-image-picker';
import { grabEmail } from "../../functions/grabEmail";

export const HomePage = () => {
  let email = grabEmail();

  const getImageHandler = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(res);
  }


  return (
    <View>
      <Text>Home Page</Text>
      <Text>{email}</Text>
      <StyleButton onPress={getImageHandler}>Add image!</StyleButton>
      <Link href="/users/1">Go to user 1</Link>
      <Link href="/users/2">Go to user 2</Link>
      <Link href="/vendors/fetchVendor">Go to Marketplace</Link>
      <Link href="/checklist/1">Go to checklist 1</Link>
    </View>
  );
}

export default HomePage;
