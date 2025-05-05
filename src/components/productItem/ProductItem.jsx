import { Card, Row, Col, Button } from "react-bootstrap";
import './productItem.css';
import { useNavigate } from "react-router";

const ProductItem = ({
    productId,
    productName,
    productYear,
    productDescription,
    productPrice,
    productImage,
    productCountry,
    productStock,
    productState,
    onProductSelected }) => {

    const navigate = useNavigate();

    const handleProductPage = () => {
        onProductSelected(productId);
        navigate(`${productId}`, {
            state: {
                product: {
                    productName,
                    productYear,
                    productDescription,
                    productPrice,
                    productImage,
                    productCountry,
                    productStock,
                    productState
                }
            }
        })
    }


    return (
        <>
            {productState ? <Card style={{ width: '16rem', margin: "16px", background: "lightgray" }} className="mx-3 card-container">
                <div key={productId}>
                    <div>
                        <Card.Img style={{ borderwidth: "2px", bordercolor: "gray" }}
                            height={250}
                            variant="top"
                            src={productImage}
                            alt={productName} />
                        <Card.Title className="card-title"> Camiseta {productName} {productYear}</Card.Title>
                        <Card.Body className="card-body">
                            <p className="price">$ {parseFloat(productPrice).toFixed(2)}</p>
                            
                            <Button
                                className="btn btn-primary "
                                variant="primary"
                                onClick={handleProductPage}>Comprar</Button>
                        </Card.Body>
                    </div>
                </div>
            </Card> : null}
        </>
    )
}

export default ProductItem