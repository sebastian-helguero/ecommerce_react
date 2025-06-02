export const registerUser = (
    fullName, 
    birthDate, 
    phone, 
    city, 
    address, 
    areaCode, 
    username,
    email, 
    userPassword, 
    onSuccess, 
    onError) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/register`, {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ fullName, birthDate, phone, city, address, areaCode, username, email, userPassword })
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Algo ha salido mal");
            }

             return res.json();
        })
        .then(onSuccess)
        .catch(onError)
}