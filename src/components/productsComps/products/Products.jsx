import { useEffect, useState } from 'react';
import ProductItem from '../productItem/ProductItem'
import ProductSearch from '../productSearch/ProductSearch';
import NavBar from '../../navBar/NavBar';
import { getProducts } from './GetProducts.services';

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [searchProduct, setSearchProduct] = useState("");
    const [selectedProductCountries, setSelectedProductCountries] = useState([]);
    const [prodList, setProdList] = useState([]);
    

    const handleProductSelected = (productId) => {
        setSelectedProduct(productId);
    }
    const handleProductSearch = (value) => {
        setSearchProduct(value)
    }
    const handleSelectedProductCountry = (productCountry) => {
        setSelectedProductCountries(productCountry)
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
            product.productState === true && 
            product.productName?.toUpperCase().includes(searchProduct.toUpperCase())
            && (selectedProductCountries.length === 0 || selectedProductCountries.includes(product.productCountry)))

        .map((product) =>
            <ProductItem
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
                onProductSelected={handleProductSelected}
                
            />)
    return (
        <>
            <NavBar />
            <div className="d-flex align-items-flex-start" style={{ width: "100%" }}>
                <ProductSearch onSearch={handleProductSearch} searchProduct={searchProduct} onCountryFilter={setSelectedProductCountries} products={prodList} />
                <div className="d-flex flex-wrap" style={{ width: "100%", marginTop: "90px" }}>
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

export default Products