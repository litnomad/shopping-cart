import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

/*
import { createBrowserRouter, RouterProvider } from "react-router";

import Shopping from "./Shopping";
import Cart from "./Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <Shopping />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
    ],
  },
]);
*/

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
