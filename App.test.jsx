import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./src/App";
import Shopping from "./src/Shopping";
import Cart from "./src/Cart";

test("renders App", () => {
  render(<App />);

  screen.debug();
});

test("renders Shopping page", () => {
  render(<App />);

  expect(screen.getByText("Shopping page!")).toBeInTheDocument();
});

test("renders Shopping Cart (0)", () => {
  render(<App />);

  expect(
    screen.getByRole("link", { name: "Shopping Cart" }),
  ).toBeInTheDocument();
  expect(screen.getByText("(0)")).toBeInTheDocument();
});

test("Add to Cart buttons appear on the Shopping page", async () => {
  render(<Shopping />);

  expect(await screen.findAllByRole("button", { name: "Add to Cart" }));
});

test("updates in real time to Shopping Cart (2) when input of the quantity is 2 and Add to Cart is clicked", async () => {
  const user = userEvent.setup();

  render(<App />);

  const inputs = await screen.findAllByLabelText("Quantity:");
  const buttons = await screen.findAllByRole("button", {
    name: "Add to Cart",
  });

  await user.type(inputs[0], "2");
  await user.click(buttons[0]);

  expect(screen.getByText("(2)")).toBeInTheDocument();
});

test("quantity of 2 is also displayed on the Cart page when items are added", async () => {
  const user = userEvent.setup();

  render(<App />);

  const inputs = await screen.findAllByLabelText("Quantity:");
  const buttons = await screen.findAllByRole("button", {
    name: "Add to Cart",
  });

  await user.type(inputs[0], "2");
  await user.click(buttons[0]);
  await user.click(screen.getByRole("link", { name: "Shopping Cart" }));

  expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
});

test("renders input on the Cart page when the edit button is clicked next to the quantity", async () => {
  const user = userEvent.setup();

  const mockItems = [
    {
      id: 1,
      product: "product",
      image: "image",
      price: "$1",
      quantity: "2",
    },
  ];

  render(<Cart items={mockItems} />);

  const edit = await screen.findByRole("button", { name: "Edit" });
  await user.click(edit);
  const input = await screen.findAllByRole("spinbutton");

  expect(input.length).toEqual(1);
});

test("updates quantity on the Cart page when the input is submitted", async () => {
  const user = userEvent.setup();

  const mockItems = [
    {
      id: 1,
      product: "product",
      image: "image",
      price: 1,
      quantity: "2",
    },
  ];

  const mockChange = vi.fn((event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    return [{ ...mockItems, quantity: data.get("quantity") }];
  });

  render(<Cart items={mockItems} handleChange={mockChange} />);

  const edit = await screen.findByRole("button", { name: "Edit" });
  await user.click(edit);
  const input = await screen.findByRole("spinbutton");
  await user.clear(input);
  await user.type(input, "1");
  const submit = await screen.findByRole("button", { name: "Confirm" });
  await user.click(submit);

  expect(mockChange).toHaveBeenCalledTimes(1);

  const text = await screen.findByText("1");

  expect(text).toBeInTheDocument();
});
