import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/ContextReducer";

import Home from "./screen/Home";
import Login from "./screen/Login";
import Signup from "./screen/signup";
import Cart from "./components/Cart";
import Myorder from "./screen/Myorder";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<Myorder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
