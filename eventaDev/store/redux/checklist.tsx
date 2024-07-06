import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Checklist } from '../../interfaces/checklistInterface';
import { Task } from "../../interfaces/taskInterface";


interface ChecklistSystemState {
    checklistData: Checklist | null,
    tasks: Task[] | null,
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
        setTasks(state, action: PayloadAction<Task[] | null>) {
            state.tasks = action.payload;
        },
    }
})

export const { setChecklistData, setTasks } = checklistSlice.actions;
export default checklistSlice.reducer;