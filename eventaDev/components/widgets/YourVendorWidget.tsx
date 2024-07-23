import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Cost } from "../../interfaces/costInterface";
import YourVendorCard from "./YourVendorCard";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";

const YourVendorWidget = () => {
    const catering = useSelector((state: RootState) => state.budgetSystem.cateringCosts);
    const entertainment = useSelector((state: RootState) => state.budgetSystem.entertainmentCosts);
    const venues = useSelector((state: RootState) => state.budgetSystem.venueCosts);
    const decoration = useSelector((state: RootState) => state.budgetSystem.decorationCosts);
    const photographers = useSelector((state: RootState) => state.budgetSystem.photographerCosts);

    const types = ["catering", "entertainment", "venues", "decoration", "photographers"];

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
            <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerContent} >
                <View style={styles.vendorSection}>
                    <YourVendorCard vendors={catering} type={types[0]} />
                    <Text>{types[0].charAt(0).toUpperCase() + types[0].slice(1)}</Text>
                </View>
                <View style={styles.vendorSection}>
                    <YourVendorCard vendors={entertainment} type={types[1]} />
                    <Text>{types[1].charAt(0).toUpperCase() + types[1].slice(1)}</Text>
                </View>
                <View style={styles.vendorSection}>
                    <YourVendorCard vendors={venues} type={types[2]} />
                    <Text>{types[2].charAt(0).toUpperCase() + types[2].slice(1)}</Text>
                </View>
                <View style={styles.vendorSection}>
                    <YourVendorCard vendors={decoration} type={types[3]} />
                    <Text>{types[3].charAt(0).toUpperCase() + types[3].slice(1)}</Text>
                </View>
                <View style={styles.vendorSection}>
                    <YourVendorCard vendors={photographers} type={types[4]} />
                    <Text>{types[4].charAt(0).toUpperCase() + types[4].slice(1)}</Text>
                </View>
            </ScrollView>
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
        // justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 10,
    },
    containerContent: {
        paddingRight: 20,
    },
    vendorSection: {
        alignItems: 'center',
    },
});

export default YourVendorWidget;
