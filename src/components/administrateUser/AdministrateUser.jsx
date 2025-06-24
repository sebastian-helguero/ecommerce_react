import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Container } from "react-bootstrap";
import { AuthContext } from "../../services/authContext/Auth.context";
import { errorToast, successToast } from "../../utils/notification";
import { changeUserRoleService } from "./AdministrateUser.services";

const AdministrateUsers = () => {
    const [email, setEmail] = useState("");

    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleGoBack = () => navigate("/products");

    const handleModifyUserRole = async (e) => {
        e.preventDefault();

        try {
            await changeUserRoleService(email, token);
            successToast("Rol cambiado exitosamente");
            setEmail("");
        } catch (err) {
            errorToast(err.message || "No se pudo cambiar el rol del usuario");
        }
    };

    return (
        <Container style={{ maxWidth: "500px", marginTop: "40px" }}>
            <h2>Declarar administrador</h2>
            <Form onSubmit={handleModifyUserRole}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email del usuario</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="ingrese un correo"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </Form.Group>
                <div className="d-flex justify-content-between mt-4">
                    <Button variant="secondary" onClick={handleGoBack}>
                        Volver a productos
                    </Button>
                    <Button variant="primary" type="submit">
                        Cambiar a rol "admin"
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AdministrateUsers;
