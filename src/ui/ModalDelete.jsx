import { Button, Modal } from "react-bootstrap";

const ModalDelete = ({
    show,
    productId,
    productName,
    onCancel,
    onDelete }) => {

    const handleDeleteProduct = () => {
        onDelete(productId);
    }

    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Desea eliminar el producto <b>{productName}</b>?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={onCancel}>
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    onClick={handleDeleteProduct}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete;