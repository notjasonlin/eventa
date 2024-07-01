import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux/store";
import { selectVendorByTypeAndID } from "../../../functions/vendorFunctions/vendorFunctions";
import { useEffect, useState } from "react";
import { GenericVendor } from "../../../interfaces/genericVendorInterface";
import { Cost } from "../../../interfaces/costInterface";
import { deleteCost, readCost } from "../../../functions/budgetFunctions/costFunctions";
import { removeBookedVendor } from "../../../functions/vendorFunctions/bookedVendorFunctions";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { costDeleteTrigger } from "../../../store/redux/budget";
import UpdateCostModal from "../../../components/budget/UpdateCostModal";

const SingleCost = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { costID } = useLocalSearchParams();
    const budgetData = useSelector((state: RootState) => state.budgetSystem.budgetData);
    const remoteTriggers = useSelector((state: RootState) => state.budgetSystem.costTriggers);
    const [cost, setCost] = useState<Cost | null>(null);
    const [vendor, setVendor] = useState<GenericVendor | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchCost = async () => {
            if (budgetData && typeof (costID) === "string") {
                const data = await readCost(budgetData?.id, costID)
                setCost(data);
            }
        }
        fetchCost();
    }, [remoteTriggers[1], remoteTriggers[2]]) // for deletes and updates

    useEffect(() => {
        if (cost) {
            selectVendorByTypeAndID(cost.vendorType, cost.vendorID)
                .then((vendorData) => {
                    if (vendorData) {
                        console.log(vendorData[0]);
                        setVendor(vendorData[0]);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching vendor:", error);
                });
        }
    }, [cost]);

    const removeCost = async () => {
        const confirmRemove = async () => {
            if (cost && budgetData) {
                await deleteCost(cost.id);
                await removeBookedVendor(cost.vendorID, budgetData.eventId);
                dispatch(costDeleteTrigger());
                router.back();
            }
        }
        Alert.alert("Delete this cost?", "Deleting this cost cannot be undone", [
            {
                text: "Delete",
                onPress: confirmRemove,
                style: "destructive",
            },
            {
                text: "Cancel",
                style: "cancel",
            }
        ])
    }

    return (
        <>
            {cost && vendor &&
                <View style={styles.container}>
                    <Text style={styles.title}>Party Cost</Text>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <Text>{"Cost: $" + cost.costInDollar}</Text>
                    <TouchableOpacity style={styles.button} onPress={removeCost}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    {showModal && budgetData &&
                        <UpdateCostModal hideModal={() => setShowModal(false)} budget={budgetData} cost={cost} vendor={vendor}/>
                    }
                </View>
            }
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    vendorName: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SingleCost;
