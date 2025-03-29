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

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to='/todos' replace />} />
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
                    path='/todos'
                    element={
                        <PrivateRoute>
                            {/* // <Dashboard /> */}
                            <h2>Dashboard</h2>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};
export default App;
