import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./src/App";

describe("App", () => {
  it("renders App", () => {
    render(<App />);

    screen.debug();
  });
});

describe("App component", () => {
  it("renders Shopping", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders Shopping header", () => {
    render(<App />);

    expect(screen.getByText("Shopping page!"));
  });
});
