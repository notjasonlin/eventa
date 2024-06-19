import { supabase } from "../lib/supabase";
import { Cost } from "../app/(app)/(budget_files)/costInterface";

export const readCosts = async (budgetID: number): Promise<Cost[] | null> => {
    let { data: costs, error } = await supabase
        .from('costs')
        .select('*')
        .eq('budgetID', budgetID);

    if (error) {
        console.error(error);
        return null;
    } else if (!costs) {
        return null;
    } else {
        return costs;
    }
}

export const addCost = async (cost: Cost) => {
    const { data, error } = await supabase
        .from('costs')
        .insert(cost)

    if (error) {
        console.error(error);
    } 
}

export const updateCost = async (budgetID: number, costID: number, column: Record<string, any>) => { // change budget and cost ID to string when uuid
    const { data, error } = await supabase
        .from('costs')
        .update(column)
        .eq('budgetID', budgetID)
        .eq('id', costID)
        .select()

    if (error) {
        console.error(error);
    }
}
