import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/redux/store";
import { Task } from "../../../../interfaces/taskInterface";
import { Checklist } from "../../../../interfaces/checklistInterface";
import { createChecklist, readChecklist } from "../../../../functions/checklistFunctions/checklistFunctions";
import { readTasks, setEventTypeTasks } from "../../../../functions/checklistFunctions/taskFunctions";
import { supabase } from "../../../../lib/supabase";

interface CheckboxProps {
  task: Task;
  onToggle: () => void;
}

type TaskData = 
  | { type: 'header'; data: string }
  | { type: 'task'; data: Task };

const UserPage = () => {
  const event = useSelector((state: RootState) => state.selectedEvent.event);
  const [checklistData, setChecklistData] = useState<Checklist | null>(null);
  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      setChecklistData(null);
      setTasks([]);

      if (event?.id) {
        console.log("Fetching checklist for event ID:", event.id);
        let checklist = await readChecklist(event.id);

        if (!checklist) {
          console.log("No checklist found, creating new checklist...");
          checklist = await createChecklist({ eventId: event.id, eventType: event.eventType, id: Math.floor(Math.random() * 1000) });
          console.log("New checklist created:", checklist);
          if (checklist) {
            await setEventTypeTasks(checklist);
          }
        }
        setChecklistData(checklist);
        if (checklist) {
          fetchTasks(checklist.id);
        }
      }
    };

    fetchChecklist();
  }, [event, event?.id]);

  const fetchTasks = async (checklistId: number) => {
    console.log("Fetching tasks for checklist ID:", checklistId);
    const fetchedTasks = await readTasks(checklistId);
    const sortedTasks = (fetchedTasks || []).sort((a, b) => a.order - b.order);
    const todoTasks = sortedTasks.filter(task => !task.isCompleted);
    const completedTasks = sortedTasks.filter(task => task.isCompleted);
    const formattedTasks: TaskData[] = [
      { type: 'header', data: 'Todo' as const },
      ...todoTasks.map(task => ({ type: 'task' as const, data: task })),
      { type: 'header', data: 'Completed' as const },
      ...completedTasks.map(task => ({ type: 'task' as const, data: task }))
    ];
    setTasks(formattedTasks);
    console.log("Fetched tasks:", formattedTasks);
  };

  const handleToggle = async (task: Task) => {
    const newStatus = !task.isCompleted;
    await updateTaskCompletion(task.id, newStatus); // Update task completion in the database
    if (checklistData) {
      fetchTasks(checklistData.id); // Refresh the task list
    }
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>No event selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => {
          if (item.type === 'header') {
            return <Text style={styles.header}>{item.data}</Text>;
          } else {
            const task = item.data;
            return <TaskCheckbox task={task} onToggle={() => handleToggle(task)} />;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const TaskCheckbox: React.FC<CheckboxProps> = ({ task, onToggle }) => {
  const [isChecked, setIsChecked] = useState(task.isCompleted);

  useEffect(() => {
    setIsChecked(task.isCompleted);
  }, [task]);

  const handleToggle = async () => {
    await onToggle();
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.taskContainer} onPress={handleToggle}>
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.taskText, isChecked && styles.completedTaskText]}>{task.name}</Text>
    </TouchableOpacity>
  );
};

const updateTaskCompletion = async (taskId: number, isCompleted: boolean) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ isCompleted })
    .eq('id', taskId);

  if (error) {
    console.error("Error updating task completion:", error);
  } else {
    console.log("Task updated successfully:", data);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: '#fff', // Ensure the background color of header is white to avoid overlapping text
    paddingVertical: 5, // Add some padding for better spacing
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#000',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default UserPage;
