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
            {productState ? <Card className="mx-4 product card-container">
                <div key={productId}>
                    <div>
                        <Card.Img style={{ borderwidth: "2px", bordercolor: "gray" }}
                            height={250}
                            variant="top"
                            src={productImage}
                            alt={productName} />
                        <Card.Body className="product card-body">
                            <Card.Title className="product card-title"> Camiseta {productName} {productYear}</Card.Title>
                            <p className="product price">$
                                {parseFloat(productPrice).toFixed(2)}
                            </p>
                            <Button
                                className="product btn btn-primary mt-auto"
                                variant="primary"
                                onClick={handleProductPage}>
                                Comprar
                            </Button>
                        </Card.Body>
                    </div>
                </div>
            </Card> : null}
        </>
    )
}

export default ProductItem