import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import Navbar from "./Navbar";
import Shopping from "./Shopping";
import Cart from "./Cart";

export default function App() {
  const [number, setNumber] = useState(0);
  const [items, setItems] = useState([]);

  function onSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    setNumber((number) => number + Number(data.get("quantity")));

    if (items.length == 0) {
      setItems([
        {
          product: data?.get("product"),
          quantity: data?.get("quantity"),
        },
      ]);
    }
    if (items.length > 0) {
      if (items.find(({ product }) => product === data.get("product"))) {
        setItems(
          items.map((item) =>
            item.product === data.get("product")
              ? {
                  ...item,
                  quantity:
                    Number(item.quantity) + Number(data.get("quantity")),
                }
              : item,
          ),
        );
      }
      if (!items.find(({ product }) => product === data.get("product"))) {
        setItems([
          ...items,
          { product: data?.get("product"), quantity: data?.get("quantity") },
        ]);
      }
    }
  }

  function onChange(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const updatedItems = items.map((item) =>
      data.get("product") === item.product
        ? { ...item, quantity: data.get("quantity") }
        : item,
    );
    setItems(updatedItems);

    const updatedTotal = updatedItems.reduce(
      (sum, curr) => sum + Number(curr.quantity),
      0,
    );
    setNumber(updatedTotal);
  }

  return (
    <BrowserRouter>
      <nav>
        <Navbar num={number} />
      </nav>

      <Routes>
        <Route path="/" element={<Shopping handleSubmit={onSubmit} />}></Route>
        <Route
          path="/cart"
          element={<Cart items={items} handleChange={onChange} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
