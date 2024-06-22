import { Checklist } from "../../interfaces/checklistInterface";
import { supabase } from "../../lib/supabase";

export const readChecklist = async (eventID: string): Promise<Checklist | null> => {
    let { data: checklist, error } = await supabase
        .from('checklist')
        .select('*')
    
    if (error) {
        console.error("Error reading checklist:", error);
        return null;
    } else if (!checklist) {
        return null;
    } else {
        return checklist[0];
    }
}

export const createChecklist = async (checklistData: Checklist) => {
    const { data, error } = await supabase
    .from('checklist')
    .insert(checklistData)

    if (error) {
        console.error("Error creating checklist:", error);
    } else {
        console.log("Checklist created succesfully")
    }
}