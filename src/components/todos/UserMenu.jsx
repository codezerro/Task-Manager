import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../store/authSlice.js";
import { LogOut, User } from "lucide-react";

const UserMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authSlice.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='absolute top-4 right-4 flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
                <User size={20} className='text-gray-600' />
                <span className='text-gray-600'>{user?.email}</span>
            </div>
            <button
                onClick={handleLogout}
                className='flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors'
            >
                <LogOut size={16} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default UserMenu;
