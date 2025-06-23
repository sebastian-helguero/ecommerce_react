import { useNavigate } from "react-router";
import { AuthContext } from "../../services/authContext/Auth.context";
import { CartContext } from "../../services/cartContext/Cart.context";
import { createOrder } from "./CreateOrder.services";
import { Button, Card, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { errorToast, successToast } from "../../utils/notification";


const CreateOrder = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { token } = useContext(AuthContext);
    const [paymentMethod, setPaymentMethod] = useState("bank transfer");
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0
    );

    const handleCreateOrder = async () => {
        const products = cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            orderSubtotalPrice: item.productPrice * item.quantity,
        }));
        try {
            await createOrder(products, paymentMethod, totalPrice, token);
            successToast("Pedido realizado con éxito");
            clearCart();
            navigate("/products");
        } catch (err) {
            errorToast(err.message || "Error inesperado al procesar el pedido");
        }
    };

    const handleGoBack = () => navigate("/cart");

    return (
        <div className="p-4">
            <Button variant="secondary" onClick={handleGoBack} className="mb-3">
                ← Volver al carrito
            </Button>
            <Card className="p-4">
                <h2>Confirmar pedido</h2>
                <Form>
                    <Form.Label>Método de pago</Form.Label>
                    <div>
                        <Form.Check
                            type="radio"
                            label="Transferencia bancaria"
                            value="bank transfer"
                            checked={paymentMethod === "bank transfer"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            label="Débito"
                            value="debit"
                            checked={paymentMethod === "debit"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            label="Crédito"
                            value="credit"
                            checked={paymentMethod === "credit"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </div>
                </Form>
                <hr />
                <h4>Productos:</h4>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.productId}>
                            Nombre: {item.productName} | Cantidad: {item.quantity} | Subtotal: $
                            {(item.productPrice * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <hr />
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
                <Button onClick={handleCreateOrder} variant="success">Realizar pedido</Button>
            </Card>
        </div>
    );
};

export default CreateOrder;