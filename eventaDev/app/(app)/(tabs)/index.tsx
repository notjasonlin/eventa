import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import StyleButton from "../../../components/Buttons/StyleButton";
import { grabEmail } from "../../../functions/grabEmail";
import { uploadFromImages } from "../../../functions/photos/uploadFromImages";
import ImageButton from "../../../components/Buttons/ImageButton";
import { supabase } from "../../../lib/supabase";
import EventSelector from "../../../components/EventSelector";

export const HomePage = () => {
  let email = grabEmail();
  const [uri, setUri] = useState<string | null>(null);

  const addImageButtonHandler = async () => {
    const newUri = await uploadFromImages();
    setUri(newUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <Text style={styles.email}>{email}</Text>
      <StyleButton onPress={addImageButtonHandler}>Add image!</StyleButton>
      {/* <ImageButton uri={uri} /> */}
      <EventSelector />
      {/* <Link href="/users/1">Go to user 1</Link>
      <Link href="/users/2">Go to user 2</Link>
      <Link href="/vendors/fetchVendor">Go to Marketplace</Link>
      <Link href="/checklist/1">Go to checklist 1</Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
});

export default HomePage;