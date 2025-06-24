import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../services/authContext/Auth.context";
import { useContext } from "react";

const Protected = () => {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to='/login' replace />
    }
    return <Outlet />
}

export default Protected