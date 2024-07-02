import { Modal, Pressable, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Cost } from "../../interfaces/costInterface";
import { Budget } from "../../interfaces/budgetInterface";
import { useState } from "react";
import { GenericVendor } from "../../interfaces/genericVendorInterface";
import { updateCost } from "../../functions/budgetFunctions/costFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { costUpdateTrigger } from "../../store/redux/budget";

type AddCostModalProps = {
    hideModal: () => void
    budget: Budget
    cost: Cost
    vendor?: GenericVendor
}

const UpdateCostModal = ({ hideModal, budget, cost, vendor }: AddCostModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [costInDollar, setCostInDollar] = useState<number | null>(0);
    const [vendorType, setVendorType] = useState<string | null>("");

    const update = async () => {
        console.log("UPDATE")
        console.log(costInDollar)
        console.log(vendorType)

        if (costInDollar) { // && (vendorType || !vendor)
            let changes: Record<string, any> = {};
            // if (!vendor) {
            //     changes.vendorType = vendorType;
            // }
            changes.costInDollar = costInDollar;

            console.log(changes);
            await updateCost(budget.id, cost.id, changes);
            dispatch(costUpdateTrigger());
            hideModal();
        }
    }

    return (
        <Modal animationType="fade" visible={true} transparent={true}>
            <Pressable onPress={hideModal} style={styles.modalBackDrop}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Update Cost</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        onChangeText={(text) => setCostInDollar(Number(text))}
                        placeholder="Cost in Dollars"
                        placeholderTextColor="#888"
                    />
                    {!vendor && <TextInput
                        style={styles.input}
                        onChangeText={(text) => setVendorType(text)}
                        placeholder="Vendor Type"
                        placeholderTextColor="#888"
                    />}
                    <TouchableOpacity onPress={update} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Update Cost</Text>
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

export default UpdateCostModal;
