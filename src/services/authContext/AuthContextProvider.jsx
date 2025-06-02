import { useState } from "react"
import { AuthContext } from "./Auth.context";

const tokenSaved = localStorage.getItem("book-champions-token");

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenSaved);

    const handleUserLogin = (newToken) => {
        localStorage.setItem("book-champions-token", newToken);
        setToken(newToken)
    }

    const handleUserLogout = () => {
        localStorage.removeItem("book-champions-token");
        setToken("");
    }


    return (
        <AuthContext value={{ token, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthContext>
    )
}

export default AuthContextProvider