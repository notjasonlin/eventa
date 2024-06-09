import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import ImageButton from "../Buttons/ImageButton";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

// Define the type for the vendor prop
interface Vendor {
  id: number;
  vendorType: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const type: string = vendor.vendorType;
  const title: string = type.charAt(0).toUpperCase() + type.slice(1);
  const DEFAULT_IMAGE = { uri: `https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/public/marketplace/${type}/default.png` };
  return (
    <Link href={{ pathname: "(vendor_files)/VendorTypePage", params: { type: type, title: title } }} asChild>
      <TouchableOpacity style={styles.card}>
        <View>
          <ImageBackground source={DEFAULT_IMAGE} style={styles.imageBackground}>
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={{ height: '100%', width: '100%' }}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 0.5, y: 1 }} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{title}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default VendorCard;

const styles = StyleSheet.create({
  card: {
    borderColor: "#60d8ba",
    borderRadius: 15,
    borderWidth: 2,
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  imageBackground: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    // opacity: 0.88,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent', // Make background transparent to see gradient through text
    alignItems: 'center',
  },
  text: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    // backgroundColor: "#60d8ba",
    // borderRadius: 4,
    // overflow: "hidden",
  },
});
