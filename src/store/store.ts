import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    }
})

store.subscribe(() => {
    try {
        // Save the current state to localStorage
        const state = store.getState();
        localStorage.setItem('todos', JSON.stringify(state.todo.todos));
    } catch (error) {
        console.error('Failed to save state to localStorage:', error);
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch