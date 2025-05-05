import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const NewProduct = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCountry, setProductCountry] = useState("");
    const [productStock, setProductStock] = useState("");
    const [productSize, setProductSize] = useState("");
    const [productImage, setProductImage] = useState("");

    const HandleAddProduct = (event) => {
        event.preventDefault();

        const productData = {
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productCountry: productCountry,
            productStock: productStock,
            productSize: productSize,
            productImage: productImage,
        };
        console.log({ productData });
    }

    return (
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="prouctName">
                                <Form.Label>Nombre del producto</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar nombre del producto" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productDescription">
                                <Form.Label>Descrpción</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar descrpción" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productPrice">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar Precio"
                                    min={1}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productCountry">
                                <Form.Label>País del producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar País del producto"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productStock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar Stock"
                                    min={1}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productSize">
                                <Form.Label>Tamaño</Form.Label>
                                <Form.Control as="select" defaultValue="">
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="productImage">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar url de imagen" />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Button variant="primary" onSubmit={HandleAddProduct}>
                                Agregar producto
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default NewProduct;