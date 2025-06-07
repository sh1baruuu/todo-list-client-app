'use client';

import { RootState } from '@/store/store';
import { getTodoById } from '@/store/todoSlice';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Props {
    id: number | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function TaskViewModal({ id, isOpen, onClose }: Props) {
    const todo = useSelector((state: RootState) => getTodoById(state.todo, id ?? 0));

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{todo?.taskTitle}</DialogTitle>
                </DialogHeader>
                <p>{todo?.task}</p>
            </DialogContent>
        </Dialog>
    );
}

