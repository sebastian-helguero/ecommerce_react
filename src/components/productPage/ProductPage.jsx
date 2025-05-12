import { useLocation, useNavigate } from "react-router";

import { Card, Row, Col, Button } from "react-bootstrap";



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
        productStock,
        productState } = location.state.product;

    const handleProductPage = () => {
        navigate("/");
    };
    return (
        <div key={productId} className="d-flex justify-content flex-wrap">

            <Card style={{ width: '30rem', margin: "10px", background: "lightgray" }} className="mx-4 card-container">
                <Card.Img style={{ borderwidth: "2px", bordercolor: "gray" }}
                    height={400}
                    variant="top"
                    src={productImage}
                    alt={productName} />
                <Card.Title className="card-title" >Camiseta {productName} {productYear}</Card.Title>
                <Card.Body>
                    <p>{productCountry}</p>
                    <Row><p>{!productDescription ? "no hay descripcion de este producto" : productDescription}</p>
                        <Col md={7}>
                            <p className="price">$ {parseFloat(productPrice).toFixed(2)}</p>
                        </Col>
                        <Col md={5}>
                            <p style={{ color: "gray" }}>Disponible: {productStock}</p>
                        </Col>
                    </Row>

                    <Button className="me-2" onClick={handleProductPage}>
                        Volver a la página principal
                    </Button>


                    <div></div>
                </Card.Body></Card>
        </div>

    )
}

export default ProductPage