import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="text-danger mb-4">403 - Acceso no autorizado</h1>
                    <p className="mb-4">No tenés permiso para ver esta página.</p>
                    <Button variant="primary" onClick={() => navigate("/")}>
                        Volver al inicio
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Unauthorized;