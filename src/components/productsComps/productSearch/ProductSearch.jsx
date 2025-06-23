import { Card, FormControl, FormGroup } from "react-bootstrap"
import ProductFilter from "../productFilter/ProductFilter"

const ProductSearch = ({ onSearch, searchProduct, onCountryFilter, products }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value)
    }
    return (
        <div className="product-search" style={{ width: "30%", justifyContent: "flex-start", margin: "20px", marginTop: "100px", minWidth: "200px"}}>
            <Card style={{ position: "fixed", top: "100px", left: "30px", width: "23%", padding: "10px", backgroundColor: "lightgray", minWidth: "200px" }}>
                <h2 style={{ fontSize: "30px", margin: "10px" }}>Filtros</h2>
                <FormGroup className="mb-2 mt-2 search-input-container" controlId="searchProduct">
                    <FormControl
                        type="text"
                        placeholder="Buscar producto..."
                        onChange={handleSearchChange}
                        value={searchProduct} />
                </FormGroup>
                <ProductFilter onCountryFilter={onCountryFilter} products={products} />
            </Card>
        </div>
    )
}

export default ProductSearch