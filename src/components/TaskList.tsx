import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppDispatch } from '@/store/store';
import { removeTodo, Todo, toggleTodo } from '@/store/todoSlice';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Badge } from './ui/badge';

interface Props {
    todos: Todo[];
    setViewModalIsOpen: (isOpen: boolean) => void;
    setViewTodoId: (id: number | null) => void;
    setEditModalIsOpen: (isOpen: boolean) => void;
    setEditTodoId: (id: number | null) => void;
}

export default function TaskList({ todos, setViewTodoId, setViewModalIsOpen, setEditModalIsOpen, setEditTodoId }: Props) {
    const dispatch = useDispatch<AppDispatch>();


    return (
        <div className="grid grid-cols-1 w-full pb-20">
            {todos.map((todo) => {
                return (
                    <div
                        key={todo.id}
                        className="flex py-6 h-fit border-b"
                    >
                        <div className="w-full">
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-blue-600">
                                    {todo.taskTitle}
                                </h1>
                                <Badge
                                    className={`text-[9px] py-0 uppercase ${
                                        todo.completed
                                            ? 'text-green-600 border-green-600 bg-green-50'
                                            : 'text-orange-400 border-orange-400 g-orange-50'
                                    }`}
                                    variant="outline"
                                >
                                    {todo.completed ? 'Complete' : 'Pending'}
                                </Badge>
                            </div>
                            <span className="flex items-center text-xs w-10/12 pt-2 text-slate-700">
                                <p className="line-clamp-1">{todo.task}</p>
                            </span>
                        </div>

                        <div className="flex flex-col ml-auto w-28 gap-2 cursor-pointer">
                            <div className="flex h-6 border rounded-md bg-slate-50">
                                <span
                                    className="flex items-center w-full border-r px-2"
                                    onClick={() =>
                                        dispatch(toggleTodo(todo.id))
                                    }
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        checked={todo.completed}
                                        className="mr-1"
                                    />
                                    <p className="text-[9px] font-bold text-slate-600">
                                        {todo.completed
                                            ? 'Completed'
                                            : 'Pending'}
                                    </p>
                                </span>

                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center justify-center w-10 ml-auto">
                                        <ChevronDown
                                            strokeWidth={3}
                                            size={14}
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="text-xs px-2">
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setViewTodoId(todo.id);
                                                setViewModalIsOpen(true);
                                            }}
                                        >
                                            View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setEditTodoId(todo.id);
                                                setEditModalIsOpen(true);
                                            }}
                                        >
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                dispatch(removeTodo(todo.id))
                                            }
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
