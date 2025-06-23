export const createNewProduct = (
        productName,
        productYear,
        productDescription,
        productPrice,
        productCountry,
        productStock,
        productImage,
        productState,
        token) => {
        fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/products`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({productName, productYear, productDescription, productImage, productCountry, productPrice, productStock, productState})
        })
            .then(async res => {
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Algo ha salido mal");
            }
             return res.json();
            })
            .catch(err => console.log(err))
    }