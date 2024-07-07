import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Checklist } from '../../interfaces/checklistInterface';
import { Task } from "../../interfaces/taskInterface";

interface TaskData {
    type: 'header' | 'task';
    data: Task | string;
}

interface ChecklistSystemState {
    checklistData: Checklist | null;
    tasks: TaskData[] | null;
}

const initialState: ChecklistSystemState = {
    checklistData: null,
    tasks: null,
}

const checklistSlice = createSlice({
    name: "checklistSystem",
    initialState,
    reducers: {
        setChecklistData(state, action: PayloadAction<Checklist | null>) {
            state.checklistData = action.payload;
        },
        setTasks(state, action: PayloadAction<TaskData[] | null>) {
            state.tasks = action.payload;
        },
    }
});

export const { setChecklistData, setTasks } = checklistSlice.actions;
export default checklistSlice.reducer;
