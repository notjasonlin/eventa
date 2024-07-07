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
    costTriggers: boolean[],
    costBookPackage: {
        cost: Cost | null,
        eventID: string | null,
    },
}

const initialState: BudgetSystemState = {
    budgetData: null,
    costs: null,
    venueCosts: null,
    cateringCosts: null,
    photographerCosts: null,
    entertainmentCosts: null,
    decorationCosts: null,
    costTriggers: [false, false, false], // use trigger for changes to following in this order [add, delete, update]
    costBookPackage: {
        cost: null,
        eventID: null,
    },
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
        costAddTrigger(state) {
            state.costTriggers[0] = !state.costTriggers[0];
        },
        costDeleteTrigger(state) {
            state.costTriggers[1] = !state.costTriggers[1];
        },
        costUpdateTrigger(state) {
            state.costTriggers[2] = !state.costTriggers[2];
        },
        setPackageCost(state, action: PayloadAction<Cost | null>) {
            state.costBookPackage.cost = action.payload;
        },
        setPackageEventID(state, action: PayloadAction<string | null>) {
            state.costBookPackage.eventID = action.payload;
        },
    }
})

export const { setBudgetData, setCosts, setVenueCosts, setCateringCosts, setPhotographerCosts, setEntertainmentCosts,
    setDecorationCosts, costAddTrigger, costDeleteTrigger, costUpdateTrigger, setPackageCost, setPackageEventID} = budgetSlice.actions;
export default budgetSlice.reducer;