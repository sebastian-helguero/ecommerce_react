export const editProductService = (
        productId,
        newProductName,
        newProductYear,
        newProductDescription,
        newProductPrice,
        newProductCountry,
        newProductStock,
        newProductImage,
        productState,
        token) => {
        fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/products/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'PUT',
            body: JSON.stringify({
                productName: newProductName,
                productYear: newProductYear,
                productDescription: newProductDescription,
                productPrice: newProductPrice,
                productCountry: newProductCountry,
                productStock: newProductStock,
                productImage: newProductImage,
                productState
            }),
        })
        .then(async res => {
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || "Algo ha salido mal");
        }
        return res.json();
        });
    }
