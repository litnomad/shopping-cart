import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import Navbar from "./Navbar";
import Shopping from "./Shopping";
import Cart from "./Cart";

export default function App() {
  const [number, setNumber] = useState(0);
  const [items, setItems] = useState([]);

  function updateCart(event) {
    event.preventDefault();
    
    // currentTarget gets the parent element associated with the event handler
    const data = new FormData(event.currentTarget);
    setNumber((number) => number + Number(data.get("quantity")));

    setItems([
      ...items,
      {
        product: data?.get("product"),
        quantity: data?.get("quantity"),
      },
    ]);
  }

  function updateQuantity(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    setNumber(data.get("quantity"));
    console.log("quantity change ran", data.get("quantity"));

    // items aren't getting updated?
  }

  return (
    <BrowserRouter>
      <nav>
        <Navbar num={number} />
      </nav>

      <Routes>
        <Route path="/" element={<Shopping handleCart={updateCart} />}></Route>
        <Route
          path="/cart"
          element={<Cart items={items} onChange={updateQuantity} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
