import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./../../store/taskSlice.js";
import { Search, Filter } from "lucide-react";

const TaskFilters = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.taskSlice.filter);

    return (
        <div className='bg-white p-6 rounded-lg shadow-md space-y-4'>
            <div className='relative'>
                <Search
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={20}
                />
                <input
                    type='text'
                    placeholder='Search tasks...'
                    value={filter.search}
                    onChange={(e) =>
                        dispatch(setFilter({ search: e.target.value }))
                    }
                    className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex items-center space-x-2 flex-1'>
                    <Filter size={20} className='text-gray-400' />
                    <select
                        value={filter.status}
                        onChange={(e) =>
                            dispatch(setFilter({ status: e.target.value }))
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value='all'>All Tasks</option>
                        <option value='completed'>Completed</option>
                        <option value='incomplete'>Incomplete</option>
                    </select>
                </div>

                <div className='flex items-center space-x-2 flex-1'>
                    <Filter size={20} className='text-gray-400' />
                    <select
                        value={filter.category}
                        onChange={(e) =>
                            dispatch(setFilter({ category: e.target.value }))
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value='all'>All Categories</option>
                        <option value='personal'>Personal</option>
                        <option value='work'>Work</option>
                        <option value='groceries'>Groceries</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;
