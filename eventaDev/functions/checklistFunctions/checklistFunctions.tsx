import { Checklist } from "../../interfaces/checklistInterface";
import { Task } from "../../interfaces/taskInterface";
import { supabase } from "../../lib/supabase";

export const readChecklist = async (eventID: string): Promise<Checklist | null> => {
    let { data: checklist, error } = await supabase
        .from('checklists')
        .select('*')
        .eq('eventId', eventID);
    
    if (error) {
        console.error("Error reading checklist:", error);
        return null;
    } else if (!checklist) {
        return null;
    } else {
        return checklist[0];
    }
}

export const createChecklist = async (checklistData: Checklist): Promise<Checklist | null> => {
    const { data, error } = await supabase
      .from('checklists')
      .insert(checklistData)
      .select()
      .single();
  
    if (error) {
      console.error("Error creating checklist:", error);
      return null;
    }
  
    return data;
  };

export const setTasks = async (data: Task | null) => {
    
}