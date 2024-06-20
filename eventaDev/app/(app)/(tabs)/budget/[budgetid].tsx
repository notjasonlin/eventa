import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/redux/store";
import { Budget } from "../../(budget_files)/budgetInterface";
import { readBudget, createBudget } from "../../../../functions/budgetFunctions";
import { Cost } from "../../(budget_files)/costInterface";
import { addCost, deleteCost, readCosts, updateCost } from "../../../../functions/costFunctions";

const UserPage = () => {
  const event = useSelector((state: RootState) => state.selectedEvent.event);
  const [budgetData, setBudgetData] = useState<Budget | null>(null);
  const [costs, setCosts] = useState<Cost[] | null>(null);

  useEffect(() => {
    console.log(event?.id);
    setBudgetData(null);
    setCosts(null);

    if (event?.id) {
      const fetchBudget = async () => {
        const budget = await readBudget(event.id);
        setBudgetData(budget);
      };

      fetchBudget();
    }
  }, [event, event?.id]);

  useEffect(() => {
    const fetchCosts = async () => {
      if (budgetData && !costs) {
        setCosts(await readCosts(budgetData.id));
      }
    }
    fetchCosts();
  }, [costs, budgetData]);

  const setBudget = async () => {
    if (event) {
      await createBudget({
        eventId: event.id,
        id: Math.floor(Math.random() * 100),
        totalCost: 10,
        flexible: false,
        maxFlex: 10,
      });
      const data = await readBudget(event.id)
      await setDefaultCosts(data);
      setBudgetData(data);
    } else {
      console.error("No selected event");
    }
  }

  const setDefaultCosts = async (data: Budget | null) => {
    await addCost({ budgetID: data?.id, vendorType: "Venue" });
    await addCost({ budgetID: data?.id, vendorType: "Catering" });
    await addCost({ budgetID: data?.id, vendorType: "Photographers" });
    await addCost({ budgetID: data?.id, vendorType: "Entertainment" });
    await addCost({ budgetID: data?.id, vendorType: "Decoration" });
  }

  const createCosts = async () => {
    if (budgetData) {
      await addCost({
        budgetID: budgetData.id,
        vendorType: "Vendor",
        costInDollar: 100,
        priority: 1,
        flexibility: false,
        flexTop: 50,
        predictedCost: 100,
        absoluteMinimum: 50,
      });
      setCosts(null);
    }
  }

  const changeCosts = async () => {
    if (budgetData && costs) {
      await updateCost(budgetData.id, costs[0].id, { "vendorType": "Venue" });
      setCosts(null);
    }
  }

  const removeCost = async (costID: number) => {
    if (budgetData && costs) {
      await deleteCost(costID);
      setCosts(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>
      {!budgetData && (
        <TouchableOpacity style={styles.button} onPress={setBudget}>
          <Text style={styles.buttonText}>Set budget!</Text>
        </TouchableOpacity>
      )}
      {budgetData && (
        <>
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetText}>{"$" + budgetData.totalCost}</Text>
            <Text style={styles.budgetText}>{"Flexible: " + budgetData.flexible}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={createCosts}>
            <Text style={styles.buttonText}>Create a cost</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={changeCosts}>
            <Text style={styles.buttonText}>Update a cost</Text>
          </TouchableOpacity>
          {costs && (
            <View style={styles.costsContainer}>
              <FlatList
                data={costs}
                renderItem={({ item }) => (
                  <View style={styles.costItem}>
                    <Text style={styles.costText}>{"Vendor: " + item.vendorType}</Text>
                    <Text style={styles.costText}>{"Predicted Cost: " + item.predictedCost}</Text>
                    <Text style={styles.costText}>{"Actual Cost: " + item.costInDollar}</Text>
                    <TouchableOpacity onPress={() => removeCost(item.id)}>
                      <Text>DELETE</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  budgetContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
  },
  budgetText: {
    fontSize: 18,
    marginVertical: 5,
  },
  costsContainer: {
    flex: 1,
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  costItem: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  costText: {
    fontSize: 16,
  },
});

export default UserPage;
