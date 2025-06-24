import { useContext, useState } from "react";
import { CartContext } from "../../services/cartContext/Cart.context";
import NavBar from "../navBar/NavBar";
import ProductList from "../productsComps/productList/ProductList";
import { Button, Card } from "react-bootstrap";
import "./Cart.css"
import { useNavigate } from "react-router";

const Cart = () => {

  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCreateOrder = () => {
    navigate("/create-order")
  }
  
  const ProductsOnCart = cartItems
    .map((item) =>
      <ProductList
        key={item.productId}
        productId={item.productId}
        productName={item.productName}
        productYear={item.productYear}
        productDescription={item.productDescription}
        productPrice={item.productPrice}
        productImage={item.productImage}
        productCountry={item.productCountry}
        productStock={item.productStock}
        productState={item.productState}
        quantity={item.quantity}
        onProductRemove={removeFromCart}
      />
    )
  return (
    <>
      <NavBar />
      <div className="div-order-container d-flex align-items-flex-start" style={{ width: "100%" }}>
        <Card className="order-container">
          <div className="d-flex flex-wrap" style={{ width: "100%" }}>
            {ProductsOnCart.length ?
              <>
                <h2 style={
                  {
                    display: "flex",
                    fontSize: "30px",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px"
                  }}>Mi orden</h2>
                <div className="d-flex flex-wrap px-3 gap-2">
                  <Button onClick={clearCart} variant="danger">
                    Vaciar carrito
                  </Button>
                  <Button onClick={handleCreateOrder} variant="success">
                    Finalizar mi compra
                  </Button>
                </div>
                {ProductsOnCart}
              </> :
              <p style={
                {
                  display: "flex",
                  color: "lightgray",
                  fontSize: "30px",
                  width: "100%", justifyContent: "center",
                  alignItems: "center",
                  margin: "20px"
                }
              }>
                No ha agregado productos al carrito todavia.
              </p>}
          </div>
        </Card>
      </div>
    </>
  )
}

export default Cart