import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux/store";
import { useState } from "react";
import { createBudget, readBudget } from "../../../functions/budgetFunctions/budgetFunctions";
import { costAddTrigger, setBudgetData } from "../../../store/redux/budget";
import { useRouter } from "expo-router";
import uuid from 'react-native-uuid'; 
import { addCost } from "../../../functions/budgetFunctions/costFunctions";
import { BUDGET_ESTIMATES } from "../../../constants/budgetEstimates";

const BudgetForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const event = useSelector((state: RootState) => state.selectedEvent.event);
    const [totalBudget, setTotalBudget] = useState<number>(0);
    const [options, setOptions] = useState<boolean[]>([false, false]);
    const router = useRouter();

    const setBudget = async () => {
        if (event) {
          await createBudget({
            eventId: event.id,
            id: uuid.v4().toString(),
            totalCost: totalBudget,
            flexible: options[1],
            maxFlex: 0,
            remainder: totalBudget
          });
          const data = await readBudget(event.id);
          dispatch(setBudgetData(data));
          await Promise.all([
            addCost({
              budgetID: data?.id, 
              vendorType: "venues", 
              predictedCost: parseFloat((BUDGET_ESTIMATES.VENUES * totalBudget).toFixed(2))
            }),
            addCost({
              budgetID: data?.id, 
              vendorType: "catering", 
              predictedCost: parseFloat((BUDGET_ESTIMATES.CATERING * totalBudget).toFixed(2))
            }),
            addCost({
              budgetID: data?.id, 
              vendorType: "photographers", 
              predictedCost: parseFloat((BUDGET_ESTIMATES.PHOTOGRAPHERS * totalBudget).toFixed(2))
            }),
            addCost({
              budgetID: data?.id, 
              vendorType: "entertainment", 
              predictedCost: parseFloat((BUDGET_ESTIMATES.ENTERTAINMENT * totalBudget).toFixed(2))
            }),
            addCost({
              budgetID: data?.id, 
              vendorType: "decoration", 
              predictedCost: parseFloat((BUDGET_ESTIMATES.DECORATION * totalBudget).toFixed(2))
            })
          ]);
          
          dispatch(costAddTrigger());
          router.back();
        } else {
          console.error("No selected event");
        }
      }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Set Total Budget</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={(text) => setTotalBudget(Number(text))}
                    placeholder="Total Budget"
                    placeholderTextColor="#888"
                />
                <Text style={styles.label}>Flexible?</Text>
                <View style={styles.isFlexContainer}>
                    <TouchableOpacity 
                        style={[styles.flexOption, options[0] ? styles.selectedOption : {}]} 
                        onPress={() => setOptions([true, false])}
                    >
                        <Text style={styles.optionText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.flexOption, options[1] ? styles.selectedOption : {}]} 
                        onPress={() => setOptions([false, true])}
                    >
                        <Text style={styles.optionText}>Yes</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={setBudget}>
                    <Text style={styles.buttonText}>Add Cost</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default BudgetForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    isFlexContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    flexOption: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    selectedOption: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
    },
    optionText: {
        color: '#000',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
