import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Cost } from "../../interfaces/costInterface";
import YourVendorCard from "./YourVendorCard";
import { Link } from "expo-router";

type YourVendorWidgetProps = {
    vendorsOne: Cost[] | null,
    vendorsTwo: Cost[] | null,
    vendorsThree: Cost[] | null,
    types: string[]
}

const YourVendorWidget = ({ vendorsOne, vendorsTwo, vendorsThree, types }: YourVendorWidgetProps) => {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Vendors</Text>
                <Link href={"/(tabs)/budget/[budgetid].tsx"}>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Manage Vendors</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            <View style={styles.container}>
                <View style={styles.vendorSection}>
                    <YourVendorCard vendors={vendorsOne} type={types[0]} />
                    <Text>{types[0].charAt(0).toUpperCase() + types[0].slice(1)}</Text>
                </View>
                <View style={styles.vendorSection}>
                    <YourVendorCard vendors={vendorsTwo} type={types[1]} />
                    <Text>{types[1].charAt(0).toUpperCase() + types[1].slice(1)}</Text>
                </View>
                <View style={styles.vendorSection}>
                    <YourVendorCard vendors={vendorsThree} type={types[2]} />
                    <Text>{types[2].charAt(0).toUpperCase() + types[2].slice(1)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 17,

    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkText: {
        paddingTop: 10,
        fontSize: 12,
        color: '#DDB3A5',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    vendorSection: {
        alignItems: 'center',
    },
});

export default YourVendorWidget;
