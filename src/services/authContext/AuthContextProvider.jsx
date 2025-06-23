import { useState } from "react"
import { AuthContext } from "./Auth.context";

const tokenSaved = localStorage.getItem("book-champions-token");
const userRoleSaved = localStorage.getItem("userRole");

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenSaved);
    const [userRole, setUserRole] = useState(userRoleSaved);

    const handleUserLogin = (newToken, newUserRole) => {
        localStorage.setItem("book-champions-token", newToken);
        localStorage.setItem("userRole", newUserRole);
        setToken(newToken)
        setUserRole(newUserRole);
    }

    const handleUserLogout = () => {
        localStorage.removeItem("book-champions-token");
        localStorage.removeItem("userRole");
        setToken(null);
        setUserRole(null);
    }

    return (
        <AuthContext value={{ token, userRole, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthContext>
    )
}

export default AuthContextProvider