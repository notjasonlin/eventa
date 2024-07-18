import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/redux/store";
import { Task } from "../../../../interfaces/taskInterface";
import { Checklist } from "../../../../interfaces/checklistInterface";
import { createChecklist, readChecklist } from "../../../../functions/checklistFunctions/checklistFunctions";
import { readTasks, setEventTypeTasks } from "../../../../functions/checklistFunctions/taskFunctions";
import { setTasks, setChecklistData } from "../../../../store/redux/checklist";
import { supabase } from "../../../../lib/supabase";
import { Link } from "expo-router";

interface CheckboxProps {
  task: Task;
  onToggle: () => void;
}

type TaskData = 
  | { type: 'header'; data: string }
  | { type: 'task'; data: Task };

const UserPage = () => {
  const event = useSelector((state: RootState) => state.selectedEvent.event);
  const checklistData = useSelector((state: RootState) => state.checklistSystem.checklistData);
  const tasks = useSelector((state: RootState) => state.checklistSystem.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    const fetchChecklist = async () => {
      dispatch(setChecklistData(null));
      dispatch(setTasks(null));

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
        dispatch(setChecklistData(checklist));
        if (checklist) {
          fetchTasks(checklist.id, event.created_at, event.eventDate);
        }
      }
    };

    fetchChecklist();
  }, [event, event?.id, dispatch]);

  const fetchTasks = async (checklistId: number, createdAt: string, eventDate: string) => {
    console.log("Fetching tasks for checklist ID:", checklistId);
    const fetchedTasks = await readTasks(checklistId);
    const sortedTasks = (fetchedTasks || []).sort((a, b) => a.order - b.order);
    const todoTasks = sortedTasks.filter(task => !task.isCompleted);
    const completedTasks = sortedTasks.filter(task => task.isCompleted);
    const formattedTasks = distributeTasks(todoTasks, createdAt, eventDate);
    const formattedData: TaskData[] = [
      ...formattedTasks,
      { type: 'header', data: 'Completed' as const },
      ...completedTasks.map(task => ({ type: 'task' as const, data: task }))
    ];
    dispatch(setTasks(formattedData));
    console.log("Fetched tasks successfully!");
  };

  const distributeTasks = (tasks: Task[], createdAt: string, eventDate: string) => {
    const start = new Date(createdAt);
    const end = new Date(eventDate);

    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    const totalTasks = tasks.length;
    const tasksPerMonth = Math.floor(totalTasks / totalMonths);
    const remainingTasks = totalTasks % totalMonths;

    const distributedTasks: TaskData[] = [];
    let taskIndex = 0;

    for (let i = 0; i < totalMonths; i++) {
      const currentMonth = new Date(start.getFullYear(), start.getMonth() + i);
      const monthName = currentMonth.toLocaleString('default', { month: 'long' });
      const year = currentMonth.getFullYear();
      const header = `${monthName} ${year}`;

      distributedTasks.push({ type: 'header', data: header });

      for (let j = 0; j < tasksPerMonth && taskIndex < totalTasks; j++) {
        distributedTasks.push({ type: 'task', data: tasks[taskIndex++] });
      }
      // Add remaining tasks one per month
      if (i < remainingTasks && taskIndex < totalTasks) {
        distributedTasks.push({ type: 'task', data: tasks[taskIndex++] });
      }
    }

    return distributedTasks;
  };

  const handleToggle = async (task: Task) => {
    const newStatus = !task.isCompleted;
    await updateTaskCompletion(task.id, newStatus); // Update task completion in the database
    if (checklistData && event) {
      fetchTasks(checklistData.id, event.created_at, event.eventDate); // Refresh the task list
    }
  };

  const addTask = async () => {
    if (newTaskName.trim() === "") return;
    if (tasks) {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        name: newTaskName,
        isCompleted: false,
        order: tasks.length + 1,
        checklistID: checklistData?.id,
      };
  
      const { data, error } = await supabase
        .from('tasks')
        .insert(newTask);
  
      if (error) {
        console.error("Error adding task:", error);
      } else {
        console.log("Task added successfully:", data);
        if (checklistData && event) {
          fetchTasks(checklistData.id, event.created_at, event.eventDate); // Refresh the task list
        }
        setNewTaskName("");
      }
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
            return <Text style={styles.header}>{item.data as string}</Text>;
          } else {
            const task = item.data as Task;
            return (
              <TaskCheckbox task={task} onToggle={() => handleToggle(task)} />
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder="Add new task"
          value={newTaskName}
          onChangeText={setNewTaskName}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
    </View>
  );
};

const TaskCheckbox: React.FC<CheckboxProps> = ({ task, onToggle }) => {
  const [isChecked, setIsChecked] = useState(task.isCompleted);

  useEffect(() => {
    setIsChecked(task.isCompleted);
  }, [task]);

  const handleCheckboxToggle = async () => {
    await onToggle();
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle}>
        <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <Link href={{
        pathname: "/(checklist_files)/singleTask",
        params: { taskID: task.id }
      }} asChild>
        <TouchableOpacity style={styles.taskTextContainer}>
          <Text style={[styles.taskText, isChecked && styles.completedTaskText]}>{task.name}</Text>
        </TouchableOpacity>
      </Link>
    </View>
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
    fontSize: 25,
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
  checkboxContainer: {
    marginRight: 10,
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
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  taskInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default UserPage;
