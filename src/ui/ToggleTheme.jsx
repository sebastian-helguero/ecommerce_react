import { useContext } from "react"
import { Button } from "react-bootstrap"

import { ThemeContext } from "../services/themeContext/Theme.context";
import { THEMES } from "../services/themeContext/ThemeContextProvider.consts";


const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button onClick={toggleTheme}>
            {theme === THEMES.LIGHT ?
                "Oscuro" :
                "Claro"}
        </Button>
    )
}

export default ToggleTheme