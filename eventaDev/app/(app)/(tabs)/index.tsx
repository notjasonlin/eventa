import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { grabName } from "../../../functions/homeFunctions/grabName";
import { uploadFromImages } from "../../../functions/photos/uploadFromImages";
import ImageButton from "../../../components/Buttons/ImageButton";
import { supabase } from "../../../lib/supabase";
import EventSelector from "../../../components/event/EventSelector";
import EventDisplay from "../../../components/event/EventDisplay";
import { AppDispatch, RootState } from "../../../store/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { readCosts } from "../../../functions/budgetFunctions/costFunctions";
import { readBudget } from "../../../functions/budgetFunctions/budgetFunctions";
import { setAllCosts, setBudgetData } from "../../../store/redux/budget";
import YourVendorWidget from "../../../components/widgets/YourVendorWidget";

export const HomePage = () => {
  let name = grabName();
  const [uri, setUri] = useState<string | null>(null);
  const event = useSelector((state: RootState) => state.selectedEvent.event);
  const budget = useSelector((state: RootState) => state.budgetSystem.budgetData);
  const catering = useSelector((state: RootState) => state.budgetSystem.cateringCosts);
  const entertainment = useSelector((state: RootState) => state.budgetSystem.entertainmentCosts);
  const venues = useSelector((state: RootState) => state.budgetSystem.venueCosts);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    const fetchBudgetAndCosts = async () => {
      if (event) {
        const budgetData = await readBudget(event.id);
        dispatch(setBudgetData(budgetData));

        if (budgetData) {
          const costData = await readCosts(budgetData.id);
          dispatch(setAllCosts(costData));
        }
      }
    }
    fetchBudgetAndCosts();
  }, [event, event?.id])


  return (
    <View style={styles.container}>
      <Text style={styles.eventTitle}>Home Page</Text>
      <Text style={styles.email}>Welcome back, {name}!</Text>
      <EventSelector />
      {event && <EventDisplay />}

      {event && <YourVendorWidget vendorsOne={catering} vendorsTwo={entertainment} vendorsThree={venues} types={["catering","entertainment", "venues"]}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
});

export default HomePage;