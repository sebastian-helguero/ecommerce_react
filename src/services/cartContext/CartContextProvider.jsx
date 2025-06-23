import { useEffect, useState, useRef } from "react";
import { CartContext } from "./Cart.context";
import { errorToast, successToast } from "../../utils/notification";

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const toastShownRef = useRef({});

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const showToastOncePerAction = (key, type, message) => {
    if (!toastShownRef.current[key]) {
      toastShownRef.current[key] = true;
      type(message);
    }
  };

  const resetToasts = () => {
    toastShownRef.current = {};
  };

  const addToCart = (product) => {
    resetToasts();

    setCartItems((prev) => {
      const exists = prev.find((item) => item.productId === product.productId);

      if (exists) {
        if (exists.quantity < exists.productStock) {
          const updated = prev.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          showToastOncePerAction(`update-${product.productId}`, successToast, "Cantidad actualizada en el carrito.");
          return updated;
        } else {
          showToastOncePerAction(`stock-${product.productId}`, errorToast, "No hay suficiente stock disponible.");
          return prev;
        }
      }

      showToastOncePerAction(`add-${product.productId}`, successToast, "Producto agregado al carrito.");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    resetToasts();
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.productId !== productId);
      showToastOncePerAction(`remove-${productId}`, successToast, "Producto eliminado del carrito.");
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext>
  );
};

export default CartContextProvider;