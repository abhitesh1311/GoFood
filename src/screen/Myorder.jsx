import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const email =
        localStorage.getItem("userEmail") ||
        sessionStorage.getItem("userEmail");

      if (!email) return;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Myorderdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      
      setOrders(result.data);

    } catch (error) {
      console.log("Fetch Orders Error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-5 pt-5 text-black">
        <h1 className="text-center mb-4"> </h1>

        {orders.length === 0 ? (
          <h3 className="text-center">No Orders Yet </h3>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="mb-5 p-4 bg-dark rounded">

              
              <h4 className="text-success">
                Order Date: {order.order_date}
              </h4>

              <table className="table table-dark mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Size</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {order.order_data.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.size}</td>
                      <td>₹ {item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}
