import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AuthContext } from "../../services/authContext/Auth.context";

const NotFound = () => {
    const navigate = useNavigate();

    const { token } = useContext(AuthContext);

    const goBackLoginhandler = () => {
        navigate("/");
    }
    const goBackProductsHandler = () => {
        navigate("/products");
    }

    return (
        <div className="text-center mt-3">
            <h2>¡Ups! La página solicitada no fue encontrada</h2>
            {!token ?
                <Button className="text-center" onClick={goBackLoginhandler}>
                    Volver al inicio
                </Button>
                :
                <Button className="text-center" onClick={goBackProductsHandler}>
                    Volver a la tienda
                </Button>}
        </div>
    )
}

export default NotFound