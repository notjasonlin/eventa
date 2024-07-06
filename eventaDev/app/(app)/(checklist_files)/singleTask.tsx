import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { readSingleTask } from "../../../functions/checklistFunctions/taskFunctions";
import { Task } from "../../../interfaces/taskInterface";


const SingleTask = () => {
    return (
        <View>
            <Text>Checklist Task!</Text>
        </View>
    );
}

export default SingleTask;
// const SingleTask = () => {
//     const { taskID } = useLocalSearchParams();
//     const [task, setTask] = useState<Task | null>(null);

//     useEffect(() => {
//         const fetchTask = async () => {
//             if (checklist && (typeof (taskID) === "string")) {
//                 const data = await readSingleTask(taskID)
//             }
//         }
//     })
// }