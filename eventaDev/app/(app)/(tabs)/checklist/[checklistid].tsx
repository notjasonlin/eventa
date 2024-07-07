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

const UserPage = () => {
  const event = useSelector((state: RootState) => state.selectedEvent.event);
  const [checklistData, setChecklistData] = useState<Checklist | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

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
  }, [event]);

  const fetchTasks = async (checklistId: number) => {
    //console.log("Fetching tasks for checklist ID:", checklistId);
    const fetchedTasks = await readTasks(checklistId);
    setTasks(fetchedTasks || []);
    //console.log("Fetched tasks:", fetchedTasks);
  };

  const handleToggle = () => {
    if (checklistData) {
      fetchTasks(checklistData.id);
    }
  };

  const todoTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>No event selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo</Text>
      <FlatList
        data={todoTasks}
        renderItem={({ item }) => (
          <TaskCheckbox task={item} onToggle={handleToggle} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.header}>Completed</Text>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <TaskCheckbox task={item} onToggle={handleToggle} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const TaskCheckbox: React.FC<CheckboxProps> = ({ task, onToggle }) => {
  const [isChecked, setIsChecked] = useState(task.isCompleted);

  const handleToggle = async () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    await updateTaskCompletion(task.id, newStatus); // Update task completion in the database
    onToggle(); // Callback to refresh the task list
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
