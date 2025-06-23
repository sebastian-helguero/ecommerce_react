export const deleteUserService = async (email, token) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users/modify-state`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Error al eliminar usuario");
  }
  return await res.json();
};

export const recoverUserService = async (email, token) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users/modify-state`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Error al recuperar usuario");
  }
  return await res.json();
};