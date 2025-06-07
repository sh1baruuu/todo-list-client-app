'use client';

import { addTodo } from '@/store/todoSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewTaskModal({ isOpen, onClose }: Props) {
    const dispatch = useDispatch();
    const [task, setTask] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(addTodo({ task, taskTitle }));

        setTask('');
        setTaskTitle('');
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
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
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
