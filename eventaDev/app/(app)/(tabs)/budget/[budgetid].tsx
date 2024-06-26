import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/redux/store";
import { Budget } from "../../../../interfaces/budgetInterface";
import { readBudget, createBudget } from "../../../../functions/budgetFunctions/budgetFunctions";
import { Cost } from "../../../../interfaces/costInterface";
import { addCost, deleteCost, readCosts, updateCost } from "../../../../functions/budgetFunctions/costFunctions";

const UserPage = () => {
  const event = useSelector((state: RootState) => state.selectedEvent.event);
  const [budgetData, setBudgetData] = useState<Budget | null>(null);
  const [costs, setCosts] = useState<Cost[] | null>(null);
  const [venueCosts, setVenueCosts] = useState<Cost[]>([]);
  const [cateringCosts, setCateringCosts] = useState<Cost[]>([]);
  const [photographerCosts, setPhotographerCosts] = useState<Cost[]>([]);
  const [entertainmentCosts, setEntertainmentCosts] = useState<Cost[]>([]);
  const [decorationCosts, setDecorationCosts] = useState<Cost[]>([]);

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
        const costData = await readCosts(budgetData.id);
        if (costData) {
          setCosts(costData.costs);
          setVenueCosts(costData.venues);
          setCateringCosts(costData.catering);
          setPhotographerCosts(costData.photographers);
          setEntertainmentCosts(costData.entertainment);
          setDecorationCosts(costData.decoration);
        }
      }
    }
    fetchCosts();
  }, [costs, budgetData]);

const setBudget = async () => {
  if (event) {
    await createBudget({
      eventId: event.id,
      id: Math.floor(Math.random() * 100),
      totalCost: 10000,
      flexible: false,
      maxFlex: 10,
    });
    const data = await readBudget(event.id);
    if (data) {
      await Promise.all([
        venueCost(data),
        cateringCost(data),
        photographerCost(data),
        entertainmentCost(data),
        decorationCost(data),
      ]);
    }
    setBudgetData(data);
  } else {
    console.error("No selected event");
  }
}

const venueCost = async (data: Budget) => {
  await addCost({ budgetID: data.id, vendorType: "Venue", percentEstimate: 0.18, });
}

const cateringCost = async (data: Budget) => {
  await addCost({ budgetID: data.id, vendorType: "Catering", percentEstimate: 0.30, });
}

const photographerCost = async (data: Budget) => {
  await addCost({ budgetID: data.id, vendorType: "Photographers", percentEstimate: 0.14 });
}

const entertainmentCost = async (data: Budget) => {
  await addCost({ budgetID: data.id, vendorType: "Entertainment", percentEstimate: 0.12 });
}

const decorationCost = async (data: Budget) => {
  await addCost({ budgetID: data.id, vendorType: "Decoration", percentEstimate: 0.06 });
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
