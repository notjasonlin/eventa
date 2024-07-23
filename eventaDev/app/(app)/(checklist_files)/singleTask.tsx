import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux/store";
import { useEffect, useState } from "react";
import { Task } from "../../../interfaces/taskInterface";
import { deleteTask, readSingleTask, editTask } from "../../../functions/checklistFunctions/taskFunctions";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { setTasks } from "../../../store/redux/checklist";

const SingleTask = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { taskID } = useLocalSearchParams();
    const [task, setTask] = useState<Task | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const tasks = useSelector((state: RootState) => state.checklistSystem.tasks);

    useEffect(() => {
        const fetchTask = async () => {
            setIsLoading(true);
            if (typeof (taskID) === "string") {
                const data = await readSingleTask(parseInt(taskID, 10));
                if (data) {
                    setTask(data);
                    setTaskDescription(data.description);
                }
            }
            setIsLoading(false);
        };
        fetchTask();
    }, [taskID]);

    const handleUpdateTask = async () => {
        if (task) {
            const updatedTask = { ...task, description: taskDescription };
            await editTask(updatedTask.id, updatedTask);
            setTask(updatedTask);
            const updatedTasks = tasks?.map(t => t.type === 'task' && t.data.id === updatedTask.id ? { type: 'task', data: updatedTask } : t) || [];
            dispatch(setTasks(updatedTasks)); // Update the tasks in the Redux store
            setIsEditing(false);
            router.back(); // Navigate back to the checklist page
        }
    };

    const handleDeleteTask = async () => {
        const confirmDelete = async () => {
            if (task) {
                await deleteTask(task.id);
                const updatedTasks = tasks?.filter(t => t.type !== 'task' || t.data.id !== task.id) || [];
                dispatch(setTasks(updatedTasks)); // Update the tasks in the Redux store
                router.back(); // Navigate back to the checklist page
            }
        };

        Alert.alert("Delete this task?", "Deleting this task cannot be undone", [
            {
                text: "Delete",
                onPress: confirmDelete,
                style: "destructive",
            },
            {
                text: "Cancel",
                style: "cancel",
            }
        ]);
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {task ? (
                <>
                    <Text style={styles.title}>Your Task</Text>
                    <Text style={styles.details}>{task.name}</Text>
                    {isEditing ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={taskDescription}
                                onChangeText={setTaskDescription}
                                placeholder="Enter task description"
                                placeholderTextColor="#aaa"
                            />
                            <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.details}>{task.description}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                                <Text style={styles.buttonText}>Edit Task</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteTask}>
                                <Text style={styles.buttonText}>Delete Task</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    details: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#000',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SingleTask;
