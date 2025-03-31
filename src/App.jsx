import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import PublicRoute from "./components/auth/PublicRoute.jsx";
import Task from "./pages/Task.jsx";
import { initializeTasks } from "./store/taskSlice.js";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authSlice.user);

    React.useEffect(() => {
        if (!user) return;
        dispatch(initializeTasks(user.email));
    }, [dispatch]);
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to='/tasks' replace />} />
                <Route
                    path='/login'
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path='/register'
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path='/tasks'
                    element={
                        <PrivateRoute>
                            <Task />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};
export default App;
