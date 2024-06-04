import React from 'react';
import { View, Text } from 'react-native';

// Define the type for the vendor prop
interface Vendor {
  id: number;
  vendorType: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <View>
      <Text>{vendor.id}</Text>
      <Text>{vendor.vendorType}</Text>
    </View>
  );
};

export default VendorCard;
