import { Card, FormControl, FormGroup} from "react-bootstrap"

const ProductSearch = ({ onSearch, searchProduct}) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value)
    }
    return (
        <div style={{ width: "30%", justifyContent:"flex-start", margin:"20px", marginTop:"100px" }}>
            <Card style={{position:"fixed", top:"100px", left:"30px", width:"23%", padding:"10px", backgroundColor:"lightgray"}}>
            <FormGroup  className="mb-2 mt-2 search-input-container" controlId="searchProduct">
                <FormControl
                    type="text"
                    placeholder="Buscar producto..."
                    onChange={handleSearchChange}
                    value={searchProduct} />
            </FormGroup>
            <h2 style={{fontSize:"30px", margin:"10px"}}>Filtros</h2>
            </Card>
        </div>
    )
}

export default ProductSearch