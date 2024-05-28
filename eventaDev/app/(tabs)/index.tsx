import { Link } from "expo-router";
import { Text, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";

export const FetchEmail = () => {
  const [fetchError, setFetchError] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("Entered");
    const Fetch = async () => {
      const { data: email, error } = await supabase.from("profile").select("email");

      if (error) {
        setFetchError(true);
        console.log("Error fetching email");
      } else {
        if (email && email.length > 0) {
          setEmail(email[0].email);
        }
        setFetchError(false);
        console.log("Email fetched successfully");
      }
      console.log(email);
    };

    Fetch();
  }, []);

  return (
    <View>
      <Text>Home Page</Text>
      {fetchError === false && <Text>{email}</Text>}
      <Link href="/users/1">Go to user 1</Link>
      <Link href="/users/2">Go to user 2</Link>
      <Link href="/vendors/fetchVendor">Go to Marketplace</Link>
      <Link href="/checklist/1">Go to checklist 1</Link>
    </View>
  );
}

export default FetchEmail;
