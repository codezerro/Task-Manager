import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";
// import { toggleTask, removeTask, reorderTasks } from "../store/taskSlice";
import { Check, Trash2, Calendar, AlertCircle } from "lucide-react";

const SortableTask = ({ task }) => {
    const dispatch = useDispatch();
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const priorityColors = {
        low: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-red-100 text-red-800",
    };

    // const handleDelete = (e) => {
    //     e.stopPropagation();
    //     dispatch(removeTask(task.id));
    // };

    // const handleToggle = (e) => {
    //     e.stopPropagation();
    //     dispatch(toggleTask(task.id));
    // };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2 cursor-move ${
                task.completed ? "opacity-75" : ""
            }`}
        >
            <div className='flex items-center space-x-4'>
                <button
                    onClick={handleToggle}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-green-500"
                    }`}
                >
                    {task.completed && (
                        <Check size={16} className='text-white' />
                    )}
                </button>

                <div className='flex flex-col'>
                    <span
                        className={
                            task.completed ? "line-through text-gray-500" : ""
                        }
                    >
                        {task.title}
                    </span>
                    <div className='flex space-x-2 text-sm'>
                        <span
                            className={`px-2 py-0.5 rounded ${
                                priorityColors[task.priority]
                            }`}
                        >
                            {task.priority}
                        </span>
                        <span className='px-2 py-0.5 rounded bg-gray-100 text-gray-800'>
                            {task.category}
                        </span>
                        {task.dueDate && (
                            <span className='flex items-center space-x-1 text-gray-500'>
                                <Calendar size={14} />
                                <span>
                                    {format(
                                        new Date(task.dueDate),
                                        "MMM d, yyyy"
                                    )}
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={handleDelete}
                className='text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors'
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, filter } = useSelector((state) => state.tasks);

    const filteredTasks = tasks.filter((task) => {
        const matchesStatus =
            filter.status === "all" ||
            (filter.status === "completed" && task.completed) ||
            (filter.status === "incomplete" && !task.completed);

        const matchesCategory =
            filter.category === "all" || task.category === filter.category;

        const matchesSearch = task.title
            .toLowerCase()
            .includes(filter.search.toLowerCase());

        return matchesStatus && matchesCategory && matchesSearch;
    });

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = tasks.findIndex((task) => task.id === active.id);
            const newIndex = tasks.findIndex((task) => task.id === over.id);

            const newTasks = [...tasks];
            const [movedTask] = newTasks.splice(oldIndex, 1);
            newTasks.splice(newIndex, 0, movedTask);

            dispatch(reorderTasks(newTasks));
        }
    };

    if (filteredTasks.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center p-8 text-gray-500'>
                <AlertCircle size={48} className='mb-4' />
                <p>No tasks found</p>
            </div>
        );
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={filteredTasks}
                strategy={verticalListSortingStrategy}
            >
                <div className='space-y-2'>
                    {filteredTasks.map((task) => (
                        <SortableTask key={task.id} task={task} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default TaskList;
