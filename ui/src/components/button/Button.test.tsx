import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("renders button text", () => {
  const text = "Button text!";

  render(<Button>{text}</Button>);

  const textElement = screen.getByText(text);
  expect(textElement).toBeInTheDocument();
});
