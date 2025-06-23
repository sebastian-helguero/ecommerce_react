import { useContext, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../services/authContext/Auth.context";
import { editProductService } from "./EditProduct.services";
import { validateString } from "../../../auth/auth.helpers";
import ModalDelete from "../../../ui/ModalDelete";
import { deleteProductService } from "./DeleteProduct.services";
import { errorToast, successToast } from "../../../utils/notification";

const initialModalState = {
    show: false,
    id: 0,
    title: ''
};

const EditProduct = ({ }) => {
    const navigate = useNavigate();

    const location = useLocation();
    const { token } = useContext(AuthContext);

    const {
        productName,
        productDescription,
        productPrice,
        productImage,
        productYear,
        productCountry,
        productStock } = location.state.product;

    const [newProductName, setNewProductName] = useState(productName);
    const [newProductYear, setNewProductYear] = useState(productYear);
    const [newProductDescription, setNewProductDescription] = useState(productDescription);
    const [newProductPrice, setNewProductPrice] = useState(productPrice);
    const [newProductCountry, setNewProductCountry] = useState(productCountry);
    const [newProductStock, setNewProductStock] = useState(productStock);
    const [newProductImage, setNewProductImage] = useState(productImage);
    const [modal, setModal] = useState(initialModalState);
    const { id: productId } = useParams();

    const handleEditProductName = (event) => {
        setNewProductName(event.target.value);
    }
    const handleEditProductYear = (event) => {
        setNewProductYear(event.target.value);
    }
    const handleEditProductDescription = (event) => {
        setNewProductDescription(event.target.value);
    }
    const handleEditProductPrice = (event) => {
        const value = event.target.value;
        if (value === "") {
            setNewProductPrice("");
        } else {
            const parsed = parseFloat(value);
            if (!isNaN(parsed)) {
                setNewProductPrice(parsed);
            }
        }
    }
    const handleEditProductCountry = (event) => {
        setNewProductCountry(event.target.value);
    }
    const handleEditProductStock = (event) => {
        setNewProductStock(parseInt(event.target.value));
    }
    const handleEditProductImage = (event) => {
        setNewProductImage(event.target.value);
    }
    const handleEditProduct = async (event) => {
        event.preventDefault();
        const productState = true;

        if (!newProductName.length || !validateString(newProductName, 2, 50)) {
            return errorToast("El nombre es un campo obligatorio", { theme: 'dark' });
        }
        if (!newProductYear.length || !validateString(newProductYear, 4, 4)) {
            return errorToast("El año es un campo obligatorio y debe tener 4 dígitos", { theme: 'dark' });
        }
        if (!newProductPrice || newProductPrice <= 0) {
            return errorToast("El precio debe ser mayor a 0", { theme: 'dark' });
        }
        if (!newProductCountry.length || !validateString(newProductCountry, 2, 50)) {
            return errorToast("Debe seleccionar un país", { theme: 'dark' });
        }
        if (!newProductStock || newProductStock <= 0) {
            return errorToast("El stock debe ser mayor a 0", { theme: 'dark' });
        }
        if (!newProductImage.length || !validateString(newProductImage, 5, false)) {
            return errorToast("La imagen es un campo obligatorio", { theme: 'dark' });
        }
        try {
            await editProductService(
                productId,
                newProductName,
                newProductYear,
                newProductDescription,
                newProductPrice,
                newProductCountry,
                newProductStock,
                newProductImage,
                productState,
                token);
            successToast("¡Producto modificado exitosamente!");
            navigate("/products")
        } catch (err) {
            errorToast(err.message || "Error al modificar el producto");
        }
    };

    const handleShowDeleteModal = (productId, productName) => {
        setModal({
            show: true,
            id: productId,
            title: productName
        });
    }
    const handleHideDeleteModal = () => {
        setModal(initialModalState);
    }
    const handleDeleteProduct = async () => {
        try {
            await deleteProductService(productId, token)
            successToast("¡Producto eliminado exitosamente!");
            handleHideDeleteModal();
            navigate("/products")
        } catch (err) {
            errorToast(err.message || "Error al eliminar el producto")
        }
    }

    const handleBackToProducts = () => {
        navigate("/products");
    }
    return (
        <>
            <ModalDelete
                show={modal.show}
                productId={modal.id}
                productName={modal.title}
                onCancel={handleHideDeleteModal}
                onDelete={handleDeleteProduct}
            />
            <Card className="form-card" bg="dark" style={{ minWidth: "600px" }} >
                <Card.Body >
                    <Button className="me-3 mb-3"
                        onClick={handleBackToProducts}
                        variant="secondary"
                        type="button">
                        Volver a productos
                    </Button>
                    <Form className="text-white" onSubmit={handleEditProduct}>
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3" controlId="productName">
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newProductName}
                                        placeholder="Ingresar nombre del producto"
                                        onChange={handleEditProductName} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="productYear">
                                    <Form.Label>Año</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1900}
                                        max={new Date().getFullYear()}
                                        value={newProductYear}
                                        placeholder="Ingresar año"
                                        onChange={handleEditProductYear} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Form.Group className="mb-3" controlId="productImage">
                                <Form.Label>URL de imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newProductImage}
                                    placeholder="Ingresar url de imagen"
                                    onChange={handleEditProductImage} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="productCountry">
                                    <Form.Label>País</Form.Label>
                                    <Form.Control
                                        placeholder="Seleccionar país"
                                        as="select"
                                        defaultValue={newProductCountry}
                                        onChange={handleEditProductCountry}>
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
                                        value={newProductPrice}
                                        step="0.01"
                                        placeholder="Ingresar Precio"
                                        min={19.99}
                                        onChange={handleEditProductPrice}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="productStock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={newProductStock}
                                        placeholder="Ingresar Stock"
                                        min={1}
                                        onChange={handleEditProductStock}
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
                                        value={newProductDescription}
                                        as={"textarea"}
                                        rows={5}
                                        placeholder="Ingresar descrpción"
                                        onChange={handleEditProductDescription} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="d-flex justify-content-between aling-items-center">
                                    <Button variant="danger" onClick={handleShowDeleteModal}>
                                        Eliminar producto
                                    </Button>
                                    <Button variant="success" type="submit" >
                                        Guardar cambios
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default EditProduct