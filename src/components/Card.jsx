import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useDispatchCart } from "./ContextReducer";

export default function Cards({ foodItem }) {

  const dispatch = useDispatchCart();

  
const options = foodItem.options?.[0] || {};
const priceOptions = Object.keys(options);


  
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

 
useEffect(() => {
  if (foodItem.options?.length > 0) {
    const firstSize = Object.keys(foodItem.options[0])[0];
    setSize (firstSize);
  }
}, [foodItem]);

  if (!priceOptions.length) return null;

  
  const finalPrice = Number(qty) * Number(options[size] || 0);

  const handleAddToCart = async () => {
    dispatch({
      type: "ADD",
      name: foodItem.name,
      qty,
      size,
      price: finalPrice,
    });
  };

  return (
    <Card className="h-100 shadow" style={{ width: "100%" }}>
      <Card.Img
        variant="top"
        src={foodItem.img}
        style={{ height: "160px", objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{foodItem.name}</Card.Title>

        <Card.Text style={{ fontSize: "14px" }}>
          {foodItem.description}
        </Card.Text>

        <div className="mt-auto">
          <div className="d-flex align-items-center mb-2">

            <select
              className="m-2 bg-success text-white rounded"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>

            
            <select
              className="m-2 bg-success text-white rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

          </div>

          <div className="fs-5 mb-2">₹ {finalPrice}/-</div>

          <Button variant="success" className="w-100" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
