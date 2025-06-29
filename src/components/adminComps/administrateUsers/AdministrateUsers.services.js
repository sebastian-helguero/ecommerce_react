export const changeUserRoleService = async (userId, newRole, token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, newRole }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Error al cambiar el rol del usuario");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const deleteUserService = async (userId, token) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users/modify-state`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Error al eliminar usuario");
  }
  return await res.json();
};

export const recoverUserService = async (userId, token) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users/modify-state`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Error al recuperar usuario");
  }
  return await res.json();
};