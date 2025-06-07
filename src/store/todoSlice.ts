import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: number;
    taskTitle: string;
    task: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

// Load todos from localStorage, or return an empty array if not found
const loadTodosFromLocalStorage = (): TodoState => {
    try {
        const data = localStorage.getItem('todos');
        return data ? JSON.parse(data) : { todos: [] };
    } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
        return { todos: [] };
    }
};

const initialState: TodoState = loadTodosFromLocalStorage();

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
