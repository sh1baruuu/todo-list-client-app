import { TaskFilter } from "./TaskMenuBar";

interface Props {
    filter: TaskFilter;
    show: boolean;
}

function EmptyTasks({filter, show}: Props) {
    return (
        <div className={`flex flex-col w-full justify-center items-center ${show ? "block" : "hidden"}`}>
            <p className="text-sm text-gray-500">
                {filter === "all" ? " Add a new task here..." : (filter === "pending" ? "No pending tasks" : "No completed tasks")}

            </p>
        </div>
    );
}

export default EmptyTasks;