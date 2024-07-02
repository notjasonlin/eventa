import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/redux/store";
import { readBudget } from "../../../../functions/budgetFunctions/budgetFunctions";
import { addCost, readCosts, readUnbookedCosts, updateCost } from "../../../../functions/budgetFunctions/costFunctions";
import AddCostModal from "../../../../components/budget/AddCostModal";
import { setBudgetData, setCosts } from "../../../../store/redux/budget";
import { fetchBookedVendorsNotInBudget, setBookedVendorInBudget } from "../../../../functions/vendorFunctions/bookedVendorFunctions";
import { Link, useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons';

const UserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const event = useSelector((state: RootState) => state.selectedEvent.event);
  const budgetData = useSelector((state: RootState) => state.budgetSystem.budgetData);
  const costs = useSelector((state: RootState) => state.budgetSystem.costs);
  const remoteTriggers = useSelector((state: RootState) => state.budgetSystem.costTriggers);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setBudgetData(null));
    dispatch(setCosts(null));

    if (event?.id) {
      const fetchBudget = async () => {
        const budget = await readBudget(event.id);
        dispatch(setBudgetData(budget));
      };
      fetchBudget();
    }
  }, [event, event?.id, remoteTriggers[0], remoteTriggers[1], trigger]);

  useEffect(() => {
    const fetchCosts = async () => {
      if (budgetData) {
        const costData = await readCosts(budgetData.id);
        if (costData) {
          dispatch(setCosts(costData.costs));
          // set different cost types here
        }
      }
    }
    fetchCosts();
  }, [budgetData, trigger, remoteTriggers[1], remoteTriggers[2]]);


  useEffect(() => {
    const bookedVendorCosts = async () => {
      if (event && budgetData) {
        const vendorsToAdd = await fetchBookedVendorsNotInBudget(event.id);
        // const unbookedCosts = await readUnbookedCosts(budgetData.id);

        if (vendorsToAdd) { // && unbookedCosts
          for (let i = 0, n = vendorsToAdd.length; i < n; i++) {
            const curr = vendorsToAdd[i];

            await addCost({
              budgetID: budgetData?.id,
              vendorType: curr.vendorType,
              vendorID: curr.vendorID,
              costInDollar: curr.cost,
              // Add other details once available
            });
            await setBookedVendorInBudget(curr.vendorID, curr.eventID, true);
          }
          setTrigger(!trigger);
        }
      }
    }
    bookedVendorCosts();
  }, [remoteTriggers[0]])

  const createCosts = async (budgetID: string, costInDollar: number, vendorType: string) => {
    await addCost({
      budgetID: budgetID,
      vendorType: vendorType,
      costInDollar: costInDollar,
    });
    setTrigger(!trigger);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>
      {!budgetData && (
        <TouchableOpacity style={styles.button} onPress={() => {
          if (!event) {
            Alert.alert("No selected event!");
          } else {
            router.push("/(budget_files)/BudgetForm")
          }
        }}>
          <Text style={styles.buttonText}>Set budget!</Text>
        </TouchableOpacity>
      )}
      {budgetData && (
        <>
          <View style={styles.budgetContainer}>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetLabel}>Your Budget</Text>
              <Text style={styles.budgetText}>{"$" + budgetData.totalCost}</Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetLabel}>Remaining</Text>
              <Text style={styles.budgetText}>{"$" + budgetData.remainder}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
            <Text style={styles.buttonText}>Create a cost</Text>
          </TouchableOpacity>
          {costs && (
            <View style={styles.costsContainer}>
              <FlatList
                data={costs}
                renderItem={({ item }) => (
                  <Link href={{
                    pathname: "/(budget_files)/SingleCost",
                    params: { costID: item.id }

                  }} asChild>
                    <TouchableOpacity style={styles.costItem}>
                      <View style={styles.costTextContainer}>
                        <Text style={styles.costText}>{"Vendor: " + item.vendorType}</Text>
                        <Text style={styles.costText}>{"Predicted Cost: " + item.predictedCost}</Text>
                        <Text style={styles.costText}>{"Actual Cost: " + item.costInDollar}</Text>
                      </View>
                      {!item.vendorID && (
                        <View style={styles.costWarning}>
                          <AntDesign name="warning" size={24} color="orange" />
                        </View>
                      )}
                    </TouchableOpacity>
                  </Link>
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
              />
            </View>
          )}
          {showModal && <AddCostModal budget={budgetData} addCost={createCosts} hideModal={() => setShowModal(false)} />}
        </>
      )}
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  budgetContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetItem: {
    flex: 1,
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  budgetText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#495057',
  },
  costsContainer: {
    flex: 1,
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  costItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costTextContainer: {
    flex: 1,
  },
  costWarning: {
    marginLeft: 10,
  },
  costText: {
    fontSize: 16,
    color: '#343a40',
  },
});

export default UserPage;
