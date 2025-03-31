import React from "react";
import { CheckSquare } from "lucide-react";
import TaskForm from "../components/todos/TaskForm.jsx";
import TaskFilters from "../components/todos/TaskFilters.jsx";
import UserMenu from "../components/todos/UserMenu.jsx";
import TaskList from "../components/todos/TaskList.jsx";

const Task = () => {
    return (
        <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
            <UserMenu />
            <div className='max-w-3xl mx-auto space-y-6'>
                <div className='text-center'>
                    <div className='flex items-center justify-center space-x-2'>
                        <CheckSquare size={32} className='text-blue-500' />
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Task Manager
                        </h1>
                    </div>
                    <p className='mt-2 text-gray-600'>
                        Organize your tasks efficiently.
                    </p>
                </div>

                <TaskForm />
                <TaskFilters />
                <TaskList />
            </div>
        </div>
    );
};

export default Task;
