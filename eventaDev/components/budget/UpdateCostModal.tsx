import { Modal, Pressable, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Cost } from "../../interfaces/costInterface";
import { Budget } from "../../interfaces/budgetInterface";
import { useState } from "react";
import { GenericVendor } from "../../interfaces/genericVendorInterface";
import { updateCost } from "../../functions/budgetFunctions/costFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { costUpdateTrigger } from "../../store/redux/budget";
import { updateBudget } from "../../functions/budgetFunctions/budgetFunctions";

type AddCostModalProps = {
    hideModal: () => void
    budget: Budget
    cost: Cost
    vendor: GenericVendor | null
}

const UpdateCostModal = ({ hideModal, budget, cost, vendor }: AddCostModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [costInDollar, setCostInDollar] = useState<number>(0);
    const [predictedCost, setPredictedCost] = useState<number>(0);

    const update = async () => {
        if (costInDollar) {
            let changes: Record<string, any> = {};
            if (!vendor) {
                changes.costInDollar = costInDollar;
            }
            changes.predictedCost = predictedCost;

            console.log(changes);
            await updateCost(budget.id, cost.id, changes);
            if (costInDollar !== 0) {
                const sub = costInDollar - cost.costInDollar;
                await updateBudget(budget.id, budget.remainder, sub);
            }
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
                        onChangeText={(text) => setPredictedCost(Number(text))}
                        placeholder="Predicted Cost in Dollars"
                        placeholderTextColor="#888"
                    />
                    {!vendor &&
                        <>
                            <TextInput
                                style={styles.input}
                                keyboardType="number-pad"
                                onChangeText={(text) => setCostInDollar(Number(text))}
                                placeholder="Total Cost in Dollars"
                                placeholderTextColor="#888"
                            />
                        </>}
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
