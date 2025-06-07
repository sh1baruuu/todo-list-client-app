'use client';

import { clearAll, Todo } from '@/store/todoSlice';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NewTaskModal from './NewTaskModal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { useSearchParams, useRouter } from 'next/navigation';

export enum TaskFilter {
    All = 'all',
    Pending = 'pending',
    Completed = 'completed',
}

interface Props {
    filter: TaskFilter;
    all: () => void;
    pending: () => void;
    completed: () => void;
}

export default function TaskMenuBar({
    filter,
    all,
    pending,
    completed,
}: Props) {
    const searchParams = useSearchParams();

    const router = useRouter();
    const [search, setSearch] = useState(searchParams.get('s') || '');
    const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filter);
    const dispatch = useDispatch();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('s', value);
        } else {
            params.delete('s');
        }

        router.replace(`?${params.toString()}`);
    };

    const handleChange = (value: TaskFilter) => {
        setSelectedFilter(value);
        if (value === 'all') all();
        else if (value === 'pending') pending();
        else if (value === 'completed') completed();
    };

    useEffect(() => {
        setSelectedFilter(filter);
    }, [filter]);

    return (
        <div className="w-full border-b-2 flex items-center gap-2 cursor-pointer h-fit pb-6">
            <div className="relative w-full">
                <Input
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Find tasks here..."
                    className="w-full h-8 text-sm"
                />
            </div>
            <Select
                onValueChange={handleChange}
                value={selectedFilter}
            >
                <SelectTrigger
                    size="sm"
                    className="w-[130px] text-xs md:text-sm bg-slate-50 shadow-none"
                >
                    <SelectValue placeholder="Filter Tasks" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
            </Select>
            <Button
                variant="outline"
                size="sm"
                className="bg-slate-50"
                onClick={() => dispatch(clearAll())}
            >
                Clear All
            </Button>
            <Button
                size="sm"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => setTaskModalIsOpen(true)}
            >
                <Plus className="w-4 h-4" />
                <span className="hidden md:block pr-2 text-xs md:text-sm">
                    New Task
                </span>
            </Button>

            {/* modal for creating new task */}
            <NewTaskModal
                isOpen={taskModalIsOpen}
                onClose={() => setTaskModalIsOpen(false)}
            />
        </div>
    );
}
