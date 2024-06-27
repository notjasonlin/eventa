import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Budget } from "../../interfaces/budgetInterface";
import { Cost } from "../../interfaces/costInterface";

interface BudgetSystemState {
    budgetData: Budget | null,
    costs: Cost[] | null,
    venueCosts: Cost[] | null,
    cateringCosts: Cost[] | null,
    photographerCosts: Cost[] | null,
    entertainmentCosts: Cost[] | null,
    decorationCosts: Cost[] | null,
    costTrigger: boolean,
}

const initialState: BudgetSystemState = {
    budgetData: null,
    costs: null,
    venueCosts: null,
    cateringCosts: null,
    photographerCosts: null,
    entertainmentCosts: null,
    decorationCosts: null,
    costTrigger: false,
}

const budgetSlice = createSlice({
    name: "budgetSystem",
    initialState,
    reducers: {
        setBudgetData(state, action: PayloadAction<Budget | null>) {
            state.budgetData = action.payload;
        },
        setCosts(state, action: PayloadAction<Cost[] | null>) {
            state.costs = action.payload;
        },
        setVenueCosts(state, action: PayloadAction<Cost[] | null>) {
            state.venueCosts = action.payload;
        },
        setCateringCosts(state, action: PayloadAction<Cost[] | null>) {
            state.cateringCosts = action.payload;
        },
        setPhotographerCosts(state, action: PayloadAction<Cost[] | null>) {
            state.photographerCosts = action.payload;
        },
        setEntertainmentCosts(state, action: PayloadAction<Cost[] | null>) {
            state.entertainmentCosts = action.payload;
        },
        setDecorationCosts(state, action: PayloadAction<Cost[] | null>) {
            state.decorationCosts = action.payload;
        },
        costChangeTrigger(state) {
            state.costTrigger = !state.costTrigger;
        }
    }
})

export const { setBudgetData, setCosts, setVenueCosts, setCateringCosts,
    setPhotographerCosts, setEntertainmentCosts, setDecorationCosts, costChangeTrigger} = budgetSlice.actions;
export default budgetSlice.reducer;