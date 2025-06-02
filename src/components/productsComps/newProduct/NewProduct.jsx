import { useState } from "react";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import { errorToast, successToast } from "../../../utils/notification";


import "./NewProduct.css";

const NewProduct = () => {
    const [productName, setProductName] = useState("");
    const [productYear, setProductYear] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCountry, setProductCountry] = useState("");
    const [productStock, setProductStock] = useState(0);
    const [productImage, setProductImage] = useState("");

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/products");
    }


    const handleChangeProductName = (event) => {
        setProductName(event.target.value);
    }
    const handleChangeProductYear = (event) => {
        setProductYear(event.target.value);
    }
    const handleChangeProductDescription = (event) => {
        setProductDescription(event.target.value);
    }
    const handleChangeProductPrice = (event) => {
        setProductPrice(parseFloat(event.target.value));
    }
    const handleChangeProductCountry = (event) => {
        setProductCountry(event.target.value);
    }
    const handleChangeProductStock = (event) => {
        setProductStock(parseInt(event.target.value));
    }
    const handleChangeProductImage = (event) => {
        setProductImage(event.target.value);
    }

    const HandleAddProduct = (event) => {
        event.preventDefault();
        if (!productName || !productYear || !productPrice || !productCountry || !productStock || !productImage) {
            return errorToast("El nombre, año, imagen, país, precio y stock son campos requeridos", {
                theme: 'dark'
            });
        }
        const productData = {
            productName,
            productYear,
            productDescription,
            productPrice,
            productCountry,
            productStock,
            productImage,
            productState: true
        }
        setProductName("")
        setProductYear("")
        setProductDescription("")
        setProductPrice(0)
        setProductCountry("")
        setProductStock(0)
        setProductImage("");
        console.log({ productData });
        successToast("Producto agregado correctamente", {
            theme: 'dark'
        });
    }

    return (
        <>
            <Card className="form-card" bg="dark"  >
                <Card.Body >
                    <Button className="me-3 mb-3"
                        onClick={handleGoBack}
                        variant="secondary"
                        type="button">
                        Volver a productos
                    </Button>
                    <Form className="text-white" onSubmit={HandleAddProduct}>
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3" controlId="productName">
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={productName}
                                        placeholder="Ingresar nombre del producto"
                                        onChange={handleChangeProductName} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="productYear">
                                    <Form.Label>Año</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={productYear}
                                        placeholder="Ingresar año"
                                        onChange={handleChangeProductYear} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Form.Group className="mb-3" controlId="productImage">
                                <Form.Label>URL de imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={productImage}
                                    placeholder="Ingresar url de imagen"
                                    onChange={handleChangeProductImage} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="productCountry">
                                    <Form.Label>País</Form.Label>
                                    <Form.Control
                                        placeholder="Seleccionar país"
                                        as="select"
                                        defaultValue=""
                                        onChange={handleChangeProductCountry}>
                                        <option value="" disabled>Seleccionar país</option>
                                        <option>Alemania</option>
                                        <option>España</option>
                                        <option>Francia</option>
                                        <option>Inglaterra</option>
                                        <option>Italia</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="productPrice">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={productPrice}
                                        placeholder="Ingresar Precio"
                                        min={1}
                                        onChange={handleChangeProductPrice}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="productStock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={productStock}
                                        placeholder="Ingresar Stock"
                                        min={1}
                                        onChange={handleChangeProductStock}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Col md={12} >
                                <Form.Group className="mb-3" controlId="productDescription">
                                    <Form.Label>Descrpción</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={productDescription}
                                        as={"textarea"}
                                        rows={5}
                                        placeholder="Ingresar descrpción"
                                        onChange={handleChangeProductDescription} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-end">
                            <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                                <Button variant="success" type="submit">
                                    Agregar producto
                                </Button>

                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};


export default NewProduct;