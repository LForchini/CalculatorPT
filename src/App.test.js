import App from "./App";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("calculator starts off at 0", () => {
  render(<App />, container);

  expect(container.querySelector(".text-input").value).toBe("0");
});

test("buttons clear on first press", () => {
  render(<App />, container);

  const button = container.querySelector(".btn-1");
  button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(container.querySelector(".text-input").value).toBe("1");
});

test("all buttons can be pressed without errors", () => {
  render(<App />, container);

  const char_buttons = [
    "clr",
    "del",
    "o-bracket",
    "c-bracket",
    "plus",
    "minus",
    "multiply",
    "divide",
    "equals",
  ];

  char_buttons.forEach((label, i) => {
    let button = container.querySelector(`.btn-${label}`);
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  for (let i = 0; i < 10; i++) {
    let button = container.querySelector(`.btn-${i}`);
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  }

  let button = container.querySelector(".btn-clr");
  button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(container.querySelector(".text-input").value).toBe("0");
});
