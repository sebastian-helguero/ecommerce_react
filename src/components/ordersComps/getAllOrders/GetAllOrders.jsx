import { useEffect, useState, useContext } from "react";
import { Container, Table, Button, Modal, ListGroup, Form, InputGroup } from "react-bootstrap";
import { AuthContext } from "../../../services/authContext/Auth.context";
import { errorToast } from "../../../utils/notification";
import { getAllOrdersService, updateOrderStateService } from "./OrderServices.services";
import NavBar from "../../navBar/NavBar";

const GetAllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchField, setSearchField] = useState("fullName");
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrdersService(token);
                setOrders(data);
            } catch (err) {
                errorToast(err.message || "No se pudieron cargar las órdenes");
            }
        };
        fetchOrders();
    }, [token]);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    const handleUpdateOrderState = async (newState) => {
        if (!selectedOrder) return;
        try {
            await updateOrderStateService(selectedOrder.orderId, newState, token);
            setOrders((prev) =>
                prev.map((order) =>
                    order.orderId === selectedOrder.orderId
                        ? { ...order, orderState: newState }
                        : order
                )
            );
            setSelectedOrder((prev) =>
                prev ? { ...prev, orderState: newState } : prev
            );
        } catch (err) {
            errorToast(err.message || "No se pudo actualizar el estado de la orden");
        }
    };

    const getStateVariant = (state) => {
        switch (state) {
            case "completed":
                return "success";
            case "pending":
                return "warning";
            case "cancelled":
                return "danger";
            default:
                return "secondary";
        }
    };

    const filteredOrders = orders
        .filter(order =>
            order.client?.[searchField]?.toLowerCase().includes(searchValue.toLowerCase())
        )
        .filter(order =>
            statusFilter === "all" ? true : order.orderState === statusFilter
        );

    return (
        <>
            <NavBar />
            <Container className="mt-4">
                <h2 style={{ marginTop: "80px" }}>Lista de órdenes</h2>
                <div className="filters-bar mb-3 p-2 bg-white shadow-sm rounded">
                    <h5 className="mb-2">Filtros de búsqueda</h5>
                    <InputGroup className="mb-2 align-items-center">
                        <Form.Select
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            style={{ maxWidth: "150px" }}
                        >
                            <option value="fullName">Nombre</option>
                            <option value="email">Email</option>
                        </Form.Select>
                        <Form.Control
                            placeholder={searchField === "fullName" ? "Buscar por nombre" : "Buscar por email"}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <div className="d-flex align-items-center ms-2">
                            <span className="me-2">Filtrar por estado de orden:</span>
                            <Form.Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{ maxWidth: "150px" }}
                            >
                                <option value="all">Todos</option>
                                <option value="pending">Pendientes</option>
                                <option value="completed">Completadas</option>
                                <option value="cancelled">Canceladas</option>
                            </Form.Select>
                        </div>
                    </InputGroup>
                </div>
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>ID de orden</th>
                            <th>ID de cliente</th>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Fecha de orden</th>
                            <th>Precio final</th>
                            <th>Método de pago</th>
                            <th>Estado</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.client?.userId}</td>
                                    <td>{order.client?.fullName}</td>
                                    <td>{order.client?.email}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString("es-AR")}</td>
                                    <td>${order.orderFinalPrice}</td>
                                    <td>
                                        {order.paymentMethod === "bank transfer"
                                            ? "Transferencia"
                                            : order.paymentMethod === "debit"
                                                ? "Débito"
                                                : "Crédito"}
                                    </td>
                                    <td>
                                        <span className={`badge bg-${getStateVariant(order.orderState)} custom-badge`}>
                                            {order.orderState === "pending"
                                                ? "Pendiente"
                                                : order.orderState === "completed"
                                                    ? "Completada"
                                                    : "Cancelada"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            className="badge"
                                            size="sm"
                                            variant="info"
                                            onClick={() => handleOpenModal(order)}
                                        >
                                            Ver detalles
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No se encontraron órdenes
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles de la orden</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedOrder && (
                            <>
                                <p>
                                    Cliente: <strong>{selectedOrder.client?.fullName}</strong>
                                </p>
                                <p>
                                    Email: <strong>{selectedOrder.client?.email}</strong>
                                </p>
                                <p>
                                    Estado:{" "}
                                    <span className={`badge bg-${getStateVariant(selectedOrder.orderState)} custom-badge`}>
                                        {selectedOrder.orderState === "pending"
                                            ? "Pendiente"
                                            : selectedOrder.orderState === "completed"
                                                ? "Completada"
                                                : "Cancelada"}
                                    </span>
                                </p>
                                <p>Productos:</p>
                                <ListGroup>
                                    {selectedOrder.products?.map((prod) => (
                                        <ListGroup.Item key={prod.productId}>
                                            {prod.productName} - Cantidad: {prod.orderProduct?.quantity} - Subtotal: ${prod.orderProduct?.orderSubtotalPrice}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {selectedOrder?.orderState === "pending" && (
                            <>
                                <Button
                                    variant="danger"
                                    onClick={() => handleUpdateOrderState("cancelled")}
                                >
                                    Cancelar orden
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => handleUpdateOrderState("completed")}
                                >
                                    Completar orden
                                </Button>
                            </>
                        )}
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default GetAllOrders;