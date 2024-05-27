import { View, Text } from "react-native";

const VendorCard = ({ vendor }) => {
  return (
    <View>
      <Text>{vendor.id}</Text>
      <Text>{vendor.vendorType}</Text>
    </View>
  );
};

export default VendorCard;
