export const createOrder = async (
    products, 
    paymentMethod, 
    orderFinalPrice, 
    token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/orders`, {
      
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        products,
        paymentMethod,
        orderFinalPrice,
      }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Error al crear la orden");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};
