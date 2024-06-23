import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/redux/store";
import { useLocalSearchParams } from "expo-router";
import { Task } from "../../../../interfaces/taskInterface";
import { Checklist } from "../../../../interfaces/checklistInterface";

const UserPage = () => {
  const  event = useSelector((state: RootState) => state.selectedEvent.event);
  const [checklistData, setChecklistData] = useState<Checklist | null>(null);
  const [tasks, setTasks] = useState<Task | null>(null);

  useEffect(() => {
    console.log(event?.id);
    setChecklistData(null);
    setTasks(null);

  });

  return (
    <View>
      <Text>Checklist</Text>
    </View>
  );
};

export default UserPage;
