import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Cards({ foodItem }) {
  const dispatch = useDispatchCart();
  const cart = useCart();
  const navigate = useNavigate();

  const options = foodItem.options?.[0] || {};
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (foodItem.options?.length > 0) {
      const firstSize = Object.keys(foodItem.options[0])[0];
      setSize(firstSize);
    }
  }, [foodItem]);


  useEffect(() => {
    const existingItem = cart.find(
      (item) =>
        item.name === foodItem.name && item.size === size
    );

    if (existingItem) {
      setAdded(true);
      setQty(existingItem.qty);
    } else {
      setAdded(false);
      setQty(1);
    }
  }, [cart, foodItem.name, size]);

  if (!priceOptions.length) return null;

  const finalPrice = Number(qty) * Number(options[size] || 0);

  const handleAddToCart = () => {
    const token = localStorage.getItem("authToken");


    if (!token) {
      navigate("/login");
      return;
    }


    dispatch({
      type: "ADD",
      name: foodItem.name,
      qty,
      size,
      price: finalPrice,
    });

    setAdded(true);
  };

  const increaseQty = () => {
    setQty((prev) => Math.min(prev + 1, 10));
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (added) {
      dispatch({
        type: "UPDATE",
        name: foodItem.name,
        qty,
        size,
        price: finalPrice,
      });
    }
  }, [qty]);

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
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="fs-5 mb-2">₹ {finalPrice}/-</div>

          {!added ? (
            <Button
              variant="success"
              className="w-100"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          ) : (
            <div className="d-flex justify-content-center align-items-center gap-3">
              <Button variant="danger" onClick={decreaseQty}>
                −
              </Button>
              <span className="fs-5">{qty}</span>
              <Button variant="success" onClick={increaseQty}>
                +
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}