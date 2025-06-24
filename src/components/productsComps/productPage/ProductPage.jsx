import { useLocation, useNavigate } from "react-router";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import NavBar from "../../navBar/NavBar";
import { useContext } from "react";
import { CartContext } from "../../../services/cartContext/Cart.context";

const ProductPage = () => {
    const location = useLocation();

    const navigate = useNavigate();
    
    const { addToCart } = useContext(CartContext);

    const {
        productId,
        productName,
        productDescription,
        productPrice,
        productImage,
        productYear,
        productCountry,
        productStock,
    } = location.state.product;

    const handleProductPage = () => {
        navigate("/products");
    };

    return (
        <>
            <NavBar />
            <Container className="mt-5 d-flex justify-content-center">
                <Card
                    key={productId}
                    className="shadow-lg"
                    style={{
                        maxWidth: "1000px",
                        marginTop: "50px",
                        marginBottom: "20px",
                        width: "100%",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <div className="d-flex justify-content-start p-3">
                        <Button variant="secondary" onClick={handleProductPage}>
                            Volver
                        </Button>
                    </div>
                    <Row className="g-0">
                        <Col md={6} className="d-flex align-items-center justify-content-center p-4">
                            <Card.Img
                                src={productImage}
                                alt={productName}
                                style={{
                                    maxHeight: "450px",
                                    objectFit: "contain",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </Col>
                        <Col md={6} className="p-4">
                            <Card.Body>
                                <h3 className="mb-3 text-center">
                                    Camiseta {productName} {productYear}
                                </h3>
                                <p>
                                    <strong>País:</strong> {productCountry}
                                </p>
                                <p>
                                    <strong>Descripción:</strong>{" "}
                                    {productDescription ? (
                                        <span>{productDescription}</span>
                                    ) : (
                                        <span className="text-muted">No hay descripción disponible.</span>
                                    )}
                                </p>
                                <div className="d-flex justify-content-between my-3">
                                    <p className="mb-0">
                                        <strong>Stock:</strong> {productStock}
                                    </p>
                                    <p
                                        className="mb-0"
                                        style={{
                                            fontSize: "24px",
                                            color: "#63c700",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        ${parseFloat(productPrice).toFixed(2)}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    <Button
                                        variant="success"
                                        disabled={productStock === 0}
                                        onClick={() =>
                                            addToCart({
                                                productId,
                                                productName,
                                                productDescription,
                                                productPrice,
                                                productImage,
                                                productYear,
                                                productCountry,
                                                productStock,
                                            })
                                        }
                                    >
                                        {productStock === 0 ? "Sin stock" : "Agregar al carrito"}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default ProductPage;