export const recoverProductService = async (productId, token) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/products/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'PATCH',
        });
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || "Algo ha salido mal");
        }
        return await (res.status === 204 ? {} : res.json());
    } catch (err) {
        console.error(err);
        throw err;
    }
};