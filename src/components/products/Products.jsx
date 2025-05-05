import { useState } from 'react';
import { prodList } from '../../data/prodList'
import ProductItem from '../productItem/ProductItem'

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState('');

    const handleProductSelected = (productId) => {
        setSelectedProduct(productId);
    }

    const ProductMapped = prodList.map((product) =>
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
        <div className="d-flex justify-content flex-wrap">
            {ProductMapped.length ? ProductMapped : <p>No se encontraron productos</p>}
        </div>
    )
}

export default Products