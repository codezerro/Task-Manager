import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../store/authSlice.js";
import { LogOut, User } from "lucide-react";

const UserMenu = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authSlice.user);
    const users = useSelector((state) => state.usersSlice.users);

    useEffect(() => {
        if (!auth) {
            console.log("User not found");
            return;
        }
        const name = users.find((user) => user.email === auth.email)?.name;
        if (name) {
            setName(name.slice(0, 20));
        }

        setEmail(auth.email);
    }, [auth]);
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='absolute top-4 right-4 flex items-center space-x-4'>
            <div className='flex items-center space-x-3'>
                <User
                    size={20}
                    className='text-gray-600 border border-slate-500 p-2 w-10 h-10 rounded-full'
                />
                <div className='flex flex-col'>
                    <span className='text-gray-600'>{name}</span>
                    <span className='text-gray-600 text-sm'>{auth?.email}</span>
                </div>
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
