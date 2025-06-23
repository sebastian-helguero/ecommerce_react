import { useContext, useEffect, useState } from 'react'
import { getProducts } from '../products/GetProducts.services';
import ProductList from '../productList/ProductList';
import NavBar from '../../navBar/NavBar';
import ProductSearch from '../productSearch/ProductSearch';
import { recoverProductService } from './RecoverProduct.services';
import { errorToast, successToast } from '../../../utils/notification';
import { AuthContext } from '../../../services/authContext/Auth.context';

const RecoverProduct = () => {
    const [prodList, setProdList] = useState([])
    const [searchProduct, setSearchProduct] = useState("");
    const [selectedProductCountries, setSelectedProductCountries] = useState([]);

    const { token } = useContext(AuthContext)

    const handleProductSearch = (value) => {
        setSearchProduct(value)
    }
    const handleSelectedProductCountry = (productCountry) => {
        setSelectedProductCountries(productCountry)
    }

    const productRecover = async (productId) => {
        try {
            await recoverProductService(productId, token)
            successToast("¡Producto recuperado exitosamente!");
            const updated = await getProducts();
            setProdList(updated);
        } catch (err) {
            errorToast(err.message || "Error al recuperar el producto")
        }
    }

    const productList = useEffect(() => {
        getProducts().then(products => {
            setProdList(products);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    }, []);

    const ProductMapped = prodList
        .filter
        (product =>
            product.productState === false &&
            product.productName?.toUpperCase().includes(searchProduct.toUpperCase())
            && (selectedProductCountries.length === 0 || selectedProductCountries.includes(product.productCountry)))
        .map((product) =>
            <ProductList
                key={product.productId}
                productId={product.productId}
                productName={product.productName}
                productYear={product.productYear}
                productDescription={product.productDescription}
                productPrice={product.productPrice}
                productImage={product.productImage}
                productCountry={product.productCountry}
                productStock={product.productStock}
                productState={product.productState}
                onRecover={productRecover} />)
    return (
        <>
            <NavBar />
            <div className="d-flex align-items-flex-start" style={{ width: "100%" }}>
                <ProductSearch onSearch={handleProductSearch} searchProduct={searchProduct} onCountryFilter={setSelectedProductCountries} products={prodList} />
                <div className="d-flex flex-wrap" style={{ width: "100%", marginTop: "60px", marginLeft: "20px" }}>
                    {ProductMapped.length ? ProductMapped :
                        <p style={
                            {
                                display: "flex",
                                color: "lightgray",
                                fontSize: "30px",
                                width: "100%", justifyContent: "center",
                                alignItems: "center"
                            }
                        }>
                            No se encontraron productos
                        </p>}
                </div>
            </div>
        </>
    )
}

export default RecoverProduct