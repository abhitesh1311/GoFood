import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Cards({ foodItem }) {
  const dispatch = useDispatchCart();
  const cartData = useCart();
  const navigate = useNavigate();

  const options = foodItem.options?.[0] || {};
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(0);
  const [size, setSize] = useState("");

  useEffect(() => {
    if (foodItem.options?.length > 0) {
      const firstSize = Object.keys(foodItem.options[0])[0];
      setSize(firstSize);
    }
  }, [foodItem]);

  useEffect(() => {
    const item = cartData.find(
      (i) => i.name === foodItem.name && i.size === size
    );
    setQty(item ? item.qty : 0);
  }, [cartData, size, foodItem.name]);

  if (!priceOptions.length) return null;

  const price = Number(options[size] || 0);
  const finalPrice = qty > 0 ? qty * price : price;

  // ✅ FIXED HANDLE ADD
  const handleAdd = () => {
    const token = localStorage.getItem("authToken"); // ✅ correct key

    if (!token) {
      // pending cart save
      localStorage.setItem(
        "pendingCart",
        JSON.stringify({
          name: foodItem.name,
          size,
          price,
        })
      );

      navigate("/login");
      return;
    }

    dispatch({
      type: "ADD",
      name: foodItem.name,
      size,
      price,
    });
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE",
      name: foodItem.name,
      size,
      price,
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

          <div className="fs-5 mb-2">₹ {finalPrice}/-</div>

          {qty === 0 ? (
            <Button variant="success" className="w-100" onClick={handleAdd}>
              Add to Cart
            </Button>
          ) : (
            <div className="d-flex justify-content-between align-items-center bg-success text-white rounded px-3 py-2">
              <Button variant="light" size="sm" onClick={handleRemove}>
                −
              </Button>
              <span className="fw-bold">{qty}</span>
              <Button variant="light" size="sm" onClick={handleAdd}>
                +
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}