import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../services/authContext/Auth.context";
import { useContext } from "react";

const Protected = ({ allowedRoles }) => {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to='/login' replace />
    }

    const userRole = localStorage.getItem("userRole");

    const hasAccess = allowedRoles.includes(userRole);

    if (!hasAccess) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default Protected