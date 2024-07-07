export interface Task {
    order: number,
    id: number,
    checklistId: string,
    name: string,
    description: string,
    priority: boolean,
    isCompleted: boolean,
    costInDays: number,
}