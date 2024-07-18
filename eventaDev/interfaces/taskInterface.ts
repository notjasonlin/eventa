export interface Task {
    id: number;
    checklistID: number;
    created_at: string;
    isCompleted: boolean;
    updatedDate: string;
    createdDate: string;
    name: string;
    description: string;
    priority: boolean;
    order: number;
    monthDue: number;
  }