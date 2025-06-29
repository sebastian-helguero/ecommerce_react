import { useEffect, useState, useContext } from "react";
import { Container, Table, Button, Modal, ListGroup, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../../services/authContext/Auth.context";
import { errorToast } from "../../../utils/notification";
import { getUserOrdersService } from "../getAllOrders/OrderServices.services";
import NavBar from "../../navBar/NavBar";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrdersService(token);
        setOrders(data);
      } catch (err) {
        errorToast(err.message || "No se pudieron cargar las órdenes");
      }
    };
    fetchOrders();
  }, [token]);

  const filteredOrders = orders.filter(order => {
    if (!filterState) return true;
    return order.orderState === filterState;
  });

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const getStateVariant = (state) => {
    switch(state) {
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

  const getStateText = (state) => {
    switch(state) {
      case "completed":
        return "Completada";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelada";
      default:
        return state;
    }
  };

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <h2 style={{ marginTop: "80px" }}>Mis órdenes</h2>
        <Row className="mb-3 align-items-center">
          <Col xs="auto">
            <Form.Label>Filtrar por estado de orden:</Form.Label>
          </Col>
          <Col xs="auto">
            <Form.Select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </Form.Select>
          </Col>
        </Row>

        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID de orden</th>
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
                    <span className={`badge bg-${getStateVariant(order.orderState)}`}>
                      {getStateText(order.orderState)}
                    </span>
                  </td>
                  <td className="text-center">
                    <Button size="sm" variant="info" onClick={() => handleOpenModal(order)}>
                      Ver detalles
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay órdenes registradas
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
                <p><strong>ID de orden:</strong> {selectedOrder.orderId}</p>
                <p><strong>Fecha:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString("es-AR")}</p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span className={`badge bg-${getStateVariant(selectedOrder.orderState)}`}>
                    {getStateText(selectedOrder.orderState)}
                  </span>
                </p>
                <p><strong>Productos:</strong></p>
                <ListGroup>
                  {selectedOrder.orderProducts?.map((op) => (
                    <ListGroup.Item key={`${op.orderId}-${op.productId}`}>
                      {op.product.productName} - Cantidad: {op.quantity} - Subtotal: ${op.orderSubtotalPrice}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default UserOrders;
