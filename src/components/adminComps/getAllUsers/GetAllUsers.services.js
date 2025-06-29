export const getAllUsersService = async (token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Error al obtener usuarios");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};
