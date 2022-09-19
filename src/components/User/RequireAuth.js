import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "./UserAuth";
import { useContext } from "react";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (auth?.token
        ? <Outlet />
        : < Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;