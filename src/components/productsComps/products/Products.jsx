import { useState } from 'react';
import { prodList } from '../../../data/prodList'
import ProductItem from '../productItem/ProductItem'
import ProductSearch from '../productSearch/ProductSearch';
import NavBar from '../../navBar/NavBar';



const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [searchProduct, setSearchProduct] = useState("");


    const handleProductSelected = (productId) => {
        setSelectedProduct(productId);
    }
    const handleProductSearch = (value) => {
        setSearchProduct(value)
    }

    const ProductMapped = prodList
        .filter(product => product.productName?.toUpperCase().includes(searchProduct.toUpperCase()))
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
                <ProductSearch onSearch={handleProductSearch} searchProduct={searchProduct} />

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