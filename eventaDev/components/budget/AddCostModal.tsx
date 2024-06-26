import { Modal, Pressable, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Cost } from "../../interfaces/costInterface";
import { Budget } from "../../interfaces/budgetInterface";
import { useState } from "react";

type AddCostModalProps = {
    addCost: (budgetID: number, costInDollar: number, vendorType: string) => Promise<void>
    hideModal: () => void
    budget: Budget
}

const AddCostModal = ({ addCost, hideModal, budget }: AddCostModalProps) => {
    const [costInDollar, setCostInDollar] = useState<number | null>(0);
    const [vendorType, setVendorType] = useState<string | null>("");

    const add = async () => {
        if (costInDollar && vendorType) {
            await addCost(budget.id, costInDollar, vendorType);
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
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        onChangeText={(text) => setCostInDollar(Number(text))}
                        placeholder="Cost in Dollars"
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setVendorType(text)}
                        placeholder="Vendor Type"
                        placeholderTextColor="#888"
                    />
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
    addButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default AddCostModal;
