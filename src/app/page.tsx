'use client';

import EditTaskModal from '@/components/EditTaskModal';
import EmptyTasks from '@/components/EmptyTaskIndicator';
import TaskList from '@/components/TaskList';
import TaskMenuBar, { TaskFilter } from '@/components/TaskMenuBar';
import TaskViewModal from '@/components/TaskViewModal';
import { RootState } from '@/store/store';
import { hydrateFromLocalStorage, Todo } from '@/store/todoSlice';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch();
    // Get search params from the URL
    const search = useSearchParams().get('s');
    const [filter, setFilter] = useState<TaskFilter>(TaskFilter.All);
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    const todos = useSelector((state: RootState) => state.todo.todos);
    const [showedTodo, setShowedTodo] = useState<Todo[]>([]);

    // View Modal States
    const [viewModalIsOpen, setViewModalIsOpen] = useState<boolean>(false);
    const [viewTodoId, setViewTodoId] = useState<number | null>(null);

    //Edit Modal States
    const [ediModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
    const [ediTodoId, setEditTodoId] = useState<number | null>(null);

    useEffect(() => {
        try {
            const data = localStorage.getItem('todos');
            if (data) {
                dispatch(hydrateFromLocalStorage(JSON.parse(data)));
            }
        } catch (error) {
            console.error('Failed to load todos from localStorage:', error);
        }
    }, [dispatch]);

    // Update showedTodo based on the current filter
    useEffect(() => {
        if (!Array.isArray(todos)) return;

        let filteredTodos = [...todos];

        if (filter === TaskFilter.Completed) {
            filteredTodos = filteredTodos.filter((todo) => todo.completed);
        } else if (filter === TaskFilter.Pending) {
            filteredTodos = filteredTodos.filter((todo) => !todo.completed);
        }

        if (search) {
            const keyword = search.toLowerCase();
            filteredTodos = filteredTodos.filter(
                (todo) =>
                    todo.task.toLowerCase().includes(keyword) ||
                    todo.taskTitle.toLowerCase().includes(keyword)
            );
        }

        setShowedTodo(filteredTodos);
    }, [todos, filter, search]);

    useEffect(() => {
        setFilter(TaskFilter.All);
    }, [todos]);

    // Ensure the component has mounted before rendering
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <div className="pt-12">
            <div className="flex flex-col justify-between max-w-screen-xl h-fit mx-auto px-4">
                <TaskMenuBar
                    filter={filter}
                    all={() => setFilter(TaskFilter.All)}
                    pending={() => setFilter(TaskFilter.Pending)}
                    completed={() => setFilter(TaskFilter.Completed)}
                />
                <TaskList
                    todos={showedTodo}
                    setEditModalIsOpen={setEditModalIsOpen}
                    setViewModalIsOpen={setViewModalIsOpen}
                    setEditTodoId={setEditTodoId}
                    setViewTodoId={setViewTodoId}
                />

                <EmptyTasks
                    show={showedTodo.length === 0}
                    filter={filter}
                />
                <TaskViewModal
                    id={viewTodoId}
                    isOpen={viewModalIsOpen}
                    onClose={() => setViewModalIsOpen(false)}
                />
                <EditTaskModal
                    id={ediTodoId}
                    isOpen={ediModalIsOpen}
                    onClose={() => setEditModalIsOpen(false)}
                />
            </div>
        </div>
    );
}
