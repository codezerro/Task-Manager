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

const App = () => {
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
