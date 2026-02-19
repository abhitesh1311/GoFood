import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();
  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please Login First ");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          order_data: data,
        }),
      });


      const json = await response.json();

      if (json.success) {
        alert("Order Placed Successfully ");
        dispatch({ type: "DROP" });
        navigate("/");
      } else {
        alert("Order Failed ");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error ");
    }
  };

  let totalPrice = data.reduce((total, food) => total + Number(food.price), 0);

  return (
    <div style={styles.overlay}>
      <div style={styles.closeBtn} onClick={() => navigate("/")}>✕</div>

      {data.length === 0 ? (
        <h1 style={styles.emptyText}>The Cart is Empty!</h1>
      ) : (
        <div style={styles.cartBox}>
          <h2 style={{ color: "white" }}>Your Cart 🛒</h2>

          <table className="table table-dark mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Size</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.map((food, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>₹{food.price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch({ type: "REMOVE", index })}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ color: "white", marginTop: "20px" }}>
            Total: ₹{totalPrice}
          </h2>

          <button
            type="button"
            className="btn btn-success mt-3"
            onClick={handleCheckOut}
          >
            Checkout 🛒
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.95)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  emptyText: {
    color: "white",
    fontSize: "42px",
    fontWeight: "bold",
  },
  closeBtn: {
    position: "fixed",
    top: "90px",
    right: "40px",
    background: "#ff4d4d",
    color: "white",
    fontSize: "26px",
    padding: "6px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cartBox: {
    width: "80%",
    maxHeight: "70vh",
    overflowY: "auto",
    padding: "40px",
    borderRadius: "15px",
    background: "rgba(0,0,0,0.92)",
    textAlign: "center",
  },
};
