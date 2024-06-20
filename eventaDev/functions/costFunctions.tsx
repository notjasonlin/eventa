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

export const addCost = async (costData: Record<string, any>) => {
    console.log("Data: ");
    console.log(costData);

    const defaultValues = {
        id: Math.floor(Math.random() * 100),
        budgetID: 0,
        vendorType: '',
        costInDollar: 0,
        priority: 0,
        flexibility: false,
        flexTop: 0,
        predictedCost: 0,
        absoluteMinimum: 0,
    };

    const mergedData = { ...defaultValues, ...costData };

    const insertData = {
        id: mergedData.id,
        budgetID: mergedData.budgetID,
        vendorType: mergedData.vendorType,
        costInDollar: mergedData.costInDollar,
        priority: mergedData.priority,
        flexibility: mergedData.flexibility,
        flexTop: mergedData.flexTop,
        predictedCost: mergedData.predictedCost,
        absoluteMinimum: mergedData.absoluteMinimum,
    };

    const { data, error } = await supabase
        .from('costs')
        .insert([insertData]);

    if (error) {
        throw error;
    }
};

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
