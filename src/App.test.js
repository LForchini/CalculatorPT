import App from "./App";
import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

test("renders success message", () => {
  const { getByText } = render(<App />);
  const h1 = getByText(/Success!/);
  expect(h1).toHaveTextContent("Success!");
});
