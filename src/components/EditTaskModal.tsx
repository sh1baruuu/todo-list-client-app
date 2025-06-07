'use client';

import { RootState } from '@/store/store';
import { getTodoById, updateTodo } from '@/store/todoSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { AppDispatch } from '@/store/store'; // If you typed your dispatch

interface Props {
    id: number | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditTaskModal({ isOpen, onClose, id }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const todo = useSelector((state: RootState) =>
        id !== null ? getTodoById(state.todo, id) : undefined
    );

    const [task, setTask] = useState('');
    const [taskTitle, setTaskTitle] = useState('');

    useEffect(() => {
        if (todo) {
            setTask(todo.task);
            setTaskTitle(todo.taskTitle);
        }
    }, [todo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;

        dispatch(updateTodo({ id, taskTitle, task }));
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col pt-1 gap-2"
                >
                    <Input
                        placeholder="Enter task title here..."
                        value={taskTitle}
                        required
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Enter task description here..."
                        className="w-full min-h-40"
                        required
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 pt-3 md:pt-0 justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="w-full md:w-fit md:mt-4 md:mr-2 order-1  md:order-0"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="w-full md:w-fit md:mt-4 bg-blue-600 hover:bg-blue-500"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
