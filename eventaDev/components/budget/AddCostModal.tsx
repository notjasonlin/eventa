import { Modal, Pressable, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Cost } from "../../interfaces/costInterface";
import { Budget } from "../../interfaces/budgetInterface";
import { useEffect, useState } from "react";

type AddCostModalProps = {
    addCost: (budgetID: string, remainder: number, costInDollar: number, vendorType: string) => Promise<void>
    hideModal: () => void
    budget: Budget
}

const AddCostModal = ({ addCost, hideModal, budget }: AddCostModalProps) => {
    const [costInDollar, setCostInDollar] = useState<number>(0);
    const [vendorSelector, setVendorSelector] = useState<boolean[]>([false, false, false, false, false, false]);
    const vendors = ["venues", "catering", "photographers", "entertainment", "decoration", "other"];

    const handleVendorSelection = (index: number) => {
        const newVendorSelection = vendorSelector.map((_, i) => i === index);
        console.log("New: ", newVendorSelection);
        setVendorSelector(newVendorSelection);
    };

    const add = async () => {
        let vendorType = "";
        vendorSelector.map((select, i) => {
            if (select) {
                console.log(i);
                vendorType = vendors[i];
            }
        })

        if (vendorType) {
            await addCost(budget.id, budget.remainder, costInDollar, vendorType);
            hideModal();
        } else {
            Alert.alert("Fill out the whole form");
        }
    }

    return (
        <Modal animationType="fade" visible={true} transparent={true}>
            <Pressable onPress={hideModal} style={styles.modalBackDrop}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Cost</Text>
                    <Text>Select Vendor</Text>
                    <View style={styles.row}>
                        {['Venue', 'Catering', 'Photographer'].map((vendor, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleVendorSelection(index)}
                                style={[styles.button, vendorSelector[index] && styles.selectedButton]}
                            >
                                <Text style={[styles.buttonText, vendorSelector[index] && styles.selectedButtonText]}>
                                    {vendor}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.row}>
                        {['Entertainment', 'Decoration', 'Other'].map((vendor, index) => (
                            <TouchableOpacity
                                key={index + 3}
                                onPress={() => handleVendorSelection(index + 3)}
                                style={[styles.button, vendorSelector[index + 3] && styles.selectedButton]}
                            >
                                <Text style={[styles.buttonText, vendorSelector[index + 3] && styles.selectedButtonText]}>
                                    {vendor}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {vendorSelector[5] && <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        onChangeText={(text) => setCostInDollar(Number(text))}
                        placeholder="Cost in Dollars"
                        placeholderTextColor="#888"
                    />}
                    <TouchableOpacity onPress={add} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add Cost</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackDrop: {
        flex: 1,
        backgroundColor: "#000000aa",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    buttonText: {
        color: '#000',
    },
    selectedButtonText: {
        color: '#fff',
    },
    addButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#007bff",
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default AddCostModal;
