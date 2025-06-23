import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap'
import { errorToast } from '../../../utils/notification';

const ProductList = ({ productId,
  productName,
  productYear,
  productPrice,
  productImage,
  productCountry,
  productStock,
  productState,
  quantity,
  onProductRemove,
  onRecover
}) => {

  const [productQuantity, setProductQuantity] = useState(quantity);

  const handleSumQuantity = () => {
    if (productStock > productQuantity) {
      const moreQuantity = productQuantity + 1;
      setProductQuantity(moreQuantity)
    }
    else {
      errorToast("No hay suficiente stock.")
    }
  }
  const handleMinQuantity = () => {
    if (productQuantity > 1) {
      const minusQuantity = productQuantity - 1;
      setProductQuantity(minusQuantity)
    }
  }
  const handleProductRemove = () => {
    onProductRemove(productId);
  }

  const handleProductRecover = () => {
    onRecover(productId)
  }

  return (
    <>
      <Card style={{ margin: "10px", width: "100%", minWidth: "450px" }}>
        <Row className="align-items-center" style={{ margin: "20px" }}>
          <Col md={3} className="text-center">
            <Card.Img
              src={productImage}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </Col>
          <Col md={7}>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title>Camiseta: {productName}</Card.Title>
                <Card.Title>N° ID: {productId}</Card.Title>
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Año: {productYear}</p>
                  <p>Precio: ${productPrice}</p>
                  <p>Stock: {productStock}</p>
                  <p>País: {productCountry}</p>
                </div>
              </Card.Body>
            </div>
          </Col>
          <Col md={2}>
            <div className='d-flex justify-content-center align-item-center' style={{ margin: "10px", marginRight: "30px" }}>
              {productState === false ? <Button onClick={handleProductRecover}>recuperar producto</Button> :
                <div>
                  <Button variant='danger' onClick={handleProductRemove}>X</Button>
                  <p>Cantidad:</p>
                  <div className='d-flex'>
                    <Button onClick={handleMinQuantity}>-</Button>
                    <p style={{ margin: "20px" }}>{productQuantity} </p>
                    <Button onClick={handleSumQuantity}>+</Button>
                  </div>
                </div>}
            </div>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default ProductList