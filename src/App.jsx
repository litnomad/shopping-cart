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

  return (
    <BrowserRouter>
      <nav>
        <Navbar num={number} />
      </nav>

      <Routes>
        <Route path="/" element={<Shopping handleCart={updateCart} />}></Route>
        <Route path="/cart" element={<Cart items={items} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
