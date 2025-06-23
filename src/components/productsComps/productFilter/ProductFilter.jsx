import { useState } from "react";
import { Card, Form } from "react-bootstrap";

const ProductFilter = ({ onCountryFilter, products }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const countries = [...new Set(products.map(p => p.productCountry))];

  const handleCheckboxChange = (productCountry) => {
    const updated = selectedCountries.includes(productCountry)
      ? selectedCountries.filter((c) => c !== productCountry)
      : [...selectedCountries, productCountry];

    setSelectedCountries(updated);
    onCountryFilter(updated);
  };

  return (
    <Card style={{ width: "100%", marginTop:"10px" }}>
      <Card.Body>
        <h3>Pais</h3>
        {countries.map((productCountry) => (
            
          <Form.Check
            key={productCountry}
            type="checkbox"
            label={productCountry}
            checked={selectedCountries.includes(productCountry)}
            onChange={() => handleCheckboxChange(productCountry)}
            className="mb-2"
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default ProductFilter;
