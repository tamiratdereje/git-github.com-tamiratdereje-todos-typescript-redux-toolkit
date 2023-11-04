
export interface TodoResponse {
    success: boolean;
    error: string | null;
    data: Todo[];

}

export interface SingleTodoResponse {
    success: boolean;
    error: string | null;
    data: Todo;

}

export interface Todo {
    id: string;
    description: string;
    category: string;
    priority: string;
    dueDate: string;
    status: string;
    createdAt: string;
    notes: string;
}


