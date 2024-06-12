import { Link } from "expo-router";
import { Text, View } from "react-native";
import StyleButton from "../../../components/Buttons/StyleButton";
import { grabEmail } from "../../../functions/grabEmail";
import { uploadFromImages } from "../../../functions/photos/uploadFromImages";
import { useState } from "react";


import ImageButton from "../../../components/Buttons/ImageButton";
import { supabase } from "../../../lib/supabase";


export const HomePage = () => {
  let email = grabEmail();

  const [uri, setUri] = useState<string | null>(null);

  const addImageButtonHandler = async () => {
    const newUri = await uploadFromImages();
    setUri(newUri);
  }

  return (
    <View style={{flexDirection: "column"}}>
      <Text>Home Page</Text>
      <Text>{email}</Text>
      <StyleButton onPress={addImageButtonHandler}>Add image!</StyleButton>
      <ImageButton uri={null} />
      {/* <Link href="/users/1">Go to user 1</Link>
      <Link href="/users/2">Go to user 2</Link>
      <Link href="/vendors/fetchVendor">Go to Marketplace</Link>
      <Link href="/checklist/1">Go to checklist 1</Link> */}
    </View>
  );
}

export default HomePage;
