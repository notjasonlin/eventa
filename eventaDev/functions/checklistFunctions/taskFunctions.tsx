import { supabase } from "../../lib/supabase";
import { Task } from "../../interfaces/taskInterface";

export const readTasks = async (checklistID: number): Promise<Task[] | null> => {
    let { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('checklistID', checklistID)

    if (error) {
        console.log("Error fetching tasks:", error);
        return null;
    } else if (!tasks) {
        return null;
    } else {
        return tasks;
    }
};

export const addTask = async (task: Task) => {
    const { data, error } = await supabase
        .from('tasks')
        .insert(task);

    if (error) {
        console.error("Error adding task:", error);
    }
}

export const editTask = async (checklistID: number, taskID: number, column: Record<string, any>) => {
    const { data, error } = await supabase
    .from('tasks')
    .update(column)
    .eq('checklistID', checklistID)
    .eq('taskID', taskID)
    .select()

    if (error) {
        console.error("Error editing task:", error);
    }
}

export const deleteTask = async (checklistID: number, taskID: number) => {
    const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('checklistID', checklistID)
    .eq('taskID', taskID)

    if (error) {
        console.error("Error deleting task:", error)
    }
}