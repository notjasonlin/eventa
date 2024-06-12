import { View, Text, StyleSheet } from "react-native";
import { GenericVendor } from "../app/(app)/(vendor_files)/genericVendorInterface";

interface BookedVendorCardProps {
    vendors: GenericVendor[] | null;
}

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const BookedVendorCard = ({ vendors }: BookedVendorCardProps) => {
    return (
        <View style={styles.container}>
            {vendors && vendors.length > 0 && (
                <>
                    <Text style={styles.header}>{capitalizeFirstLetter(vendors[0].vendorType)}</Text>
                    {vendors.map(vendor => (
                        <Text key={vendor.id} style={styles.vendorName}>{vendor.name}</Text>
                    ))}
                </>
            )}
        </View>
    );
}

export default BookedVendorCard;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    vendorName: {
        fontSize: 16,
        marginBottom: 3,
    },
});