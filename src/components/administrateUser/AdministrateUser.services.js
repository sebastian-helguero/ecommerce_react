export const changeUserRoleService = async (email, token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Error al cambiar el rol del usuario");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};