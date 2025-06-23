import { useContext, useState } from "react";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import { errorToast, successToast } from "../../../utils/notification";

import "./NewProduct.css";
import { createNewProduct } from "./NewProduct.services";
import { validateString } from "../../../auth/auth.helpers";
import { AuthContext } from "../../../services/authContext/Auth.context";

const NewProduct = () => {
    const [productName, setProductName] = useState("");
    const [productYear, setProductYear] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCountry, setProductCountry] = useState("");
    const [productStock, setProductStock] = useState(0);
    const [productImage, setProductImage] = useState("");
    const productState = true;

    const { token } = useContext(AuthContext)
    const [errors, setErrors] = useState({
        productName: false,
        productYear: false,
        productPrice: false,
        productCountry: false,
        productStock: false,
        productImage: false,
    });

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/products");
    }

    const handleNewProductName = (event) => {
        setProductName(event.target.value);
    }
    const handleNewProductYear = (event) => {
        setProductYear(event.target.value);
    }
    const handleNewProductDescription = (event) => {
        setProductDescription(event.target.value);
    }
    const handleNewProductPrice = (event) => {
        const value = event.target.value;
        if (value === "") {
            setProductPrice("");
        } else {
            const parsed = parseFloat(value);
            if (!isNaN(parsed)) {
                setProductPrice(parsed);
            }
        }
    }
    const handleNewProductCountry = (event) => {
        setProductCountry(event.target.value);
    }
    const handleNewProductStock = (event) => {
        setProductStock(parseInt(event.target.value));
    }
    const handleNewProductImage = (event) => {
        setProductImage(event.target.value);
    }

    const HandleAddProduct = (event) => {
        event.preventDefault();
        if (!productName.length || !validateString(productName, 2, 50)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                productName: true
            }));
            return errorToast("El nombre es un campo obligatorio", {
                theme: 'dark'
            });
        }
        if (!productYear.length || !validateString(productYear, 4, 4)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                productYear: true
            }));
            return errorToast("El año es un campo obligatorio y debe tener 4 dígitos", {
                theme: 'dark'
            });
        }
        if (!productPrice || productPrice <= 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                productPrice: true
            }));
            return errorToast("El precio es un campo obligatorio y debe ser mayor a 0", {
                theme: 'dark'
            });
        }
        if (!productCountry.length || !validateString(productCountry, 2, 50)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                productCountry: true
            }));
            return errorToast("Debe seleccionar un país", {
                theme: 'dark'
            });
        }
        if (!productStock || productStock <= 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                productStock: true
            }));
            return errorToast("El stock es un campo obligatorio y debe ser mayor a 0", {
                theme: 'dark'
            });
        }
        else if (!productImage.length || !validateString(productImage, 5, false)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                productImage: true
            }));
            return errorToast("La imagen es un campo obligatorio", {
                theme: 'dark'
            });
        }
        setErrors({
            productName: false,
            productYear: false,
            productPrice: false,
            productCountry: false,
            productStock: false,
            productImage: false,
        });

        createNewProduct(
            productName,
            productYear,
            productDescription,
            productPrice,
            productCountry,
            productStock,
            productImage,
            productState,
            token
        )
        setProductName("")
        setProductYear("")
        setProductDescription("")
        setProductPrice(0)
        setProductCountry("")
        setProductStock(0)
        setProductImage("");
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
                                        onChange={handleNewProductName} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="productYear">
                                    <Form.Label>Año</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1900}
                                        max={new Date().getFullYear()}
                                        value={productYear}
                                        placeholder="Ingresar año"
                                        onChange={handleNewProductYear} />
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
                                    onChange={handleNewProductImage} />
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
                                        onChange={handleNewProductCountry}>
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
                                        step="0.01"
                                        value={productPrice}
                                        placeholder="Ingresar Precio"
                                        min={19.99}
                                        onChange={handleNewProductPrice}
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
                                        onChange={handleNewProductStock}
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
                                        onChange={handleNewProductDescription} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-end">
                            <Col md={4} className="d-flex flex-column justify-content-end align-items-end">
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