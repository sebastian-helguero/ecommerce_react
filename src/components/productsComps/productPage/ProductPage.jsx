import { useLocation, useNavigate } from "react-router";

import { Card, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../navBar/NavBar";



const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { productId,
        productName,
        productDescription,
        productPrice,
        productImage,
        productYear,
        productCountry,
        productStock} = location.state.product;

    const handleProductPage = () => {
        navigate("/");
    };
    return (
        <>
            <NavBar />
            <div key={productId} className="d-flex justify-content flex-wrap">
                
                <Card style={{ width: '100%', margin: "100px", background: "lightgray", height:"100%", padding:"0", minWidth:"500px"}} className="mx-4 card-container">
                    <Row>
                        <Col md={6}>
                            <Card.Img style={{minWidth:"450px",borderwidth: "2px", bordercolor: "gray", width:"90%", borderRadius: "5px", borderColor:"gray", margin:"20px"}}
                                height={550}
                                variant="top"
                                src={productImage}
                                alt={productName} />    
                        </Col>
                        <Col md={6} style={{ padding:"40px", paddingRight:"60px", minWidth:"450px"}}>
                        <Card.Title className="card-title" style={{textAlign:"center" ,fontSize:"30px"}}>Camiseta {productName} {productYear}</Card.Title>
                            <Card.Body style={{textAlign:"end"}}>
                                
                                <Row>
                                    <p style={{fontSize:"20px"}}>Pais: {productCountry}</p>
                                    <div>{!productDescription ? "no hay descripcion de este producto" : <Col style={{fontSize:"20px"}}><p>Descripción: </p><p style={{textAlign:"start", fontSize:"15px"}}>{productDescription}</p></Col>}</div>
                                    <Col md={6} style={{fontSize:"30px"}}>
                                        <p style={{ color: "white", textAlign: "start" }}>Stock: {productStock}</p>
                                    </Col>
                                    <Col md={6} style={{fontSize:"30px"}}>
                                        <p className="price" style={{color:"rgb(99, 199, 0)", textShadow: "2px 2px 2px gray", fontWeight: "500"}}>$ {parseFloat(productPrice).toFixed(2)}</p>
                                    </Col>
                                </Row>
                                <Button className="me-2" onClick={handleProductPage}>
                                    Volver a la página principal
                                </Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default ProductPage