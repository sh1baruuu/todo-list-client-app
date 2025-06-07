import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: number;
    taskTitle: string;
    task: string;
    completed: boolean;
}

export interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = { todos: [] };

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ taskTitle: string, task: string }>) => {
            state.todos.push({
                id: Date.now(),
                taskTitle: action.payload.taskTitle,
                task: action.payload.task,
                completed: false,
            });
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(t => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(t => t.id !== action.payload);
        },
        updateTodo: (state, action: PayloadAction<{ id: number; taskTitle: string; task: string }>) => {
            const todo = state.todos.find(t => t.id === action.payload.id);
            if (todo) {
                todo.taskTitle = action.payload.taskTitle;
                todo.task = action.payload.task;
            }
        },
        hydrateFromLocalStorage: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
        clearAll: (state) => {
            state.todos = [];
        },
    },
});

// This gets a single todo by its ID
export const getTodoById = (state: TodoState, id: number): Todo | undefined => {
    return state.todos.find((todo) => todo.id === id);
};

export const { addTodo, toggleTodo, removeTodo, clearAll, updateTodo, hydrateFromLocalStorage } = todoSlice.actions;
export default todoSlice.reducer;
