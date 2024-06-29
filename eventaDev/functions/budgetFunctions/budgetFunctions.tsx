import { Budget } from "../../interfaces/budgetInterface";
import { supabase } from "../../lib/supabase";

export const readBudget = async (eventID: string): Promise<Budget | null> => {
    let { data: budget, error } = await supabase
        .from('budget')
        .select('*')
        .eq("eventId", eventID)
    
    if (error) {
        console.error(error);
        return null;
    } else if (!budget || budget.length == 0) {
        return null;
    } else {
        return budget[0];
    }
}

export const createBudget = async (budgetData: Budget) => {
    const { data, error } = await supabase
        .from('budget')
        .insert(budgetData)

    if (error) {
        console.error(error);
    } else {
        console.log("Budget created succesfully");
    }
}