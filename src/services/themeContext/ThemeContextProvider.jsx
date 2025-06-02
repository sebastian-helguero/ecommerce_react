import { useEffect, useState } from "react"

import { THEMES } from "./ThemeContextProvider.consts";
import { ThemeContext } from "./Theme.context";

const themeSaved = localStorage.getItem("theme");

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(themeSaved);

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme)
    }, [theme])

    const toggleTheme = () => {
        if (theme === THEMES.LIGHT) {
            localStorage.setItem("theme", THEMES.DARK);
            setTheme(THEMES.DARK);
        }
        else {
            localStorage.setItem("theme", THEMES.LIGHT);
            setTheme(THEMES.LIGHT);
        }
    }

    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    )
}

export default ThemeContextProvider