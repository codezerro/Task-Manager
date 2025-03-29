import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
    const isAuthenticated = useSelector(
        (state) => state.authSlice.isAuthenticated
    );

    if (isAuthenticated) {
        return <Navigate to='/tasks' replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
