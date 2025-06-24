import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../services/authContext/Auth.context";
import { errorToast, successToast } from "../../utils/notification";
import { Button, Container, Form } from "react-bootstrap";
import { deleteUserService, recoverUserService } from "./DeleteAndRecoverUsers.services";


const DeleteAndRecoverUsers = () => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);

    const handleEmailChange = (e) => setEmail(e.target.value);
    
    const handleGoBack = () => navigate("/products");

    const handleDeleteUser = async () => {
        try {
            await deleteUserService(email, token);
            successToast("Usuario eliminado con éxito");
            setEmail("");
        } catch (err) {
            errorToast(err.message || "Error al modificar el estado del usuario");
        }
    };

    const handleRecoverUser = async () => {
        try {
            await recoverUserService(email, token);
            successToast("Usuario recuperado con éxito");
            setEmail("");
        } catch (err) {
            errorToast(err.message || "Error al modificar el estado del usuario");
        }
    };

    return (
        <Container style={{ maxWidth: "500px", marginTop: "40px" }}>
            <h2>Modificar estado de usuario</h2>
            <Form>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email del usuario</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingrese un correo"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </Form.Group>
                <div className="d-flex justify-content-between mt-4">
                    <Button variant="secondary" onClick={handleGoBack}>
                        Volver a productos
                    </Button>
                    <div className="d-flex gap-2">
                        <Button variant="danger" onClick={handleDeleteUser}>
                            Eliminar
                        </Button>
                        <Button variant="success" onClick={handleRecoverUser}>
                            Recuperar
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>
    );
};

export default DeleteAndRecoverUsers