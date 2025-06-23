export const getProducts = () => {
    return fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/products`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Algo ha salido mal");
            }
            return res.json();
        })
        .catch(err => console.log(err));
}