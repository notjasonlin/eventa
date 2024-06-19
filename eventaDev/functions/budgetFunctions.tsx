import { Budget } from "../app/(app)/(budget_files)/budgetInterface";
import { supabase } from "../lib/supabase"

export const readBudget = async (eventID: string): Promise<Budget | null> => {
    let { data: budget, error } = await supabase
        .from('budget')
        .select('*')

    if (error) {
        console.error(error);
        return null;
    } else if (!budget) {
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
        console.log("Budget created");
    }
}