import { supabase } from "../../lib/supabase";
import { Task } from "../../interfaces/taskInterface";
import { Checklist } from "../../interfaces/checklistInterface";

export const readTasks = async (checklistID: number): Promise<Task[] | null> => {
  let { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('checklistID', checklistID); // Ensure this matches your column name

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

export const setEventTypeTasks = async (checklist: Checklist) => {
  if (checklist) {
    let templateTableName;

    switch (checklist.eventType) {
      case 'Bar Mitzvah':
      case 'Bat Mitzvah':
      case "B'nai Mitzvah":
        templateTableName = 'barMitzvahChecklistTemplate';
        break;
      case 'Quinceañera':
        templateTableName = 'quinceaneraChecklistTemplate';
        break;
      case 'Sweet 16':
        templateTableName = 'sweetSixteenChecklistTemplate';
        break;
      default:
        templateTableName = 'BasicChecklistTemplate';
        break;
    }

    const { data: templateTasks, error } = await supabase
      .from(templateTableName)
      .select('*');

    if (error) {
      console.error("Error fetching template tasks: ", error);
    } else {
      // console.log("Fetched template tasks:", templateTasks);
      if (templateTasks) {
        const tasksToAdd = templateTasks.map((task) => ({
          checklistID: checklist.id,
          name: task.name,
          description: task.description,
          priority: task.priority,
          isCompleted: false,
          id: Math.floor(Math.random() * 100000), // random unique integer
          order: task.id, // Assuming id in template is the order
        }));

        const { error: addTasksError } = await supabase
          .from('tasks')
          .insert(tasksToAdd);

        if (addTasksError) {
          console.error("Error adding tasks:", addTasksError);
        } else {
          console.log("Tasks added to the checklist");
        }
      }
    }
  }
};
