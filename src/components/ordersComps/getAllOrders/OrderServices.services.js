export const getAllOrdersService = async (token) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Error al obtener todas las órdenes");
  }
  return await res.json();
};

export const getUserOrdersService = async (token) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/user/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Error al obtener las órdenes del usuario");
  }
  return await res.json();
};

export const updateOrderStateService = async (orderId, newState, token) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/orders`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ orderId, newState })
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Error al actualizar el estado de la orden");
  }
  return await res.json();
};