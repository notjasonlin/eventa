import { View, Text, StyleSheet } from "react-native";
import ImageButton from "./Buttons/ImageButton";
import { Link } from "expo-router";

const VendorCard = ({ vendor }) => {
  const type = vendor.vendorType;
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  const DEFAULT_IMAGE = `https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/public/marketplace/${type}/default.png`

  return (
    <View style={styles.card}>
      <Link href={{ pathname: "/VendorPage", params: { type: type, title: title } }}
        asChild
      >
        <ImageButton uri={DEFAULT_IMAGE} />
      </Link>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default VendorCard;

const styles = StyleSheet.create({
  card: {
    borderColor: "#60d8ba",
    borderRadius: 15,
    borderWidth: 1,
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  text: {
    textAlign: "center",
  }
});
