import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "./UserAuth";
import { useContext } from "react";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (auth?.token && allowedRoles.includes(auth?.usertype)
        ? <Outlet />
        : auth.token
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : < Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;