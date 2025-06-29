export const registerUserByAdminService = async (
  fullName,
  birthDate,
  phone,
  city,
  address,
  areaCode,
  username,
  email,
  userPassword,
  userRole,
  userState,
  token
) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      fullName,
      birthDate,
      phone,
      city,
      address,
      areaCode,
      username,
      email,
      userPassword,
      userRole,
      userState,
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Error al registrar usuario por admin");
  }

  return await res.json();
};