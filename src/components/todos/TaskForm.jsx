import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addTask } from "../store/taskSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlusCircle } from "lucide-react";

const TaskForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("personal");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState(null);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!title.trim() || !user) return;

    //     const newTask = {
    //         id: crypto.randomUUID(),
    //         title: title.trim(),
    //         completed: false,
    //         category,
    //         priority,
    //         dueDate: dueDate ? dueDate.toISOString() : null,
    //         createdAt: new Date().toISOString(),
    //         userId: user.id,
    //     };

    //     dispatch(addTask(newTask));
    //     setTitle("");
    //     setCategory("personal");
    //     setPriority("medium");
    //     setDueDate(null);
    // };

    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-4 bg-white p-6 rounded-lg shadow-md'
        >
            <div className='flex flex-col space-y-2'>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Add a new task...'
                    className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    <option value='personal'>Personal</option>
                    <option value='work'>Work</option>
                    <option value='groceries'>Groceries</option>
                    <option value='other'>Other</option>
                </select>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    <option value='low'>Low Priority</option>
                    <option value='medium'>Medium Priority</option>
                    <option value='high'>High Priority</option>
                </select>

                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    placeholderText='Set due date'
                    className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                    dateFormat='MM/dd/yyyy'
                />
            </div>

            <button
                type='submit'
                className='w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2'
            >
                <PlusCircle size={20} />
                <span>Add Task</span>
            </button>
        </form>
    );
};

export default TaskForm;
