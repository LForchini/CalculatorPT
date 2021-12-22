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

function performOperations(operations) {
  operations.forEach((label, i) => {
    let button = container.querySelector(`.btn-${label}`);
    button.dispatchEvent(new MouseEvent(`click`, { bubbles: true }));
  });
}

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
    "decimal",
    "equals",
  ];

  performOperations(char_buttons);

  for (let i = 0; i < 10; i++) {
    let button = container.querySelector(`.btn-${i}`);
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  }

  let button = container.querySelector(".btn-clr");
  button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(container.querySelector(".text-input").value).toBe("0");
});

test("can perform basic calculations", () => {
  render(<App />, container);

  const operations = ["1", "plus", "2", "equals"];

  performOperations(operations);

  expect(container.querySelector(".text-input").value).toBe("3");
});

test("can perform complex calculations", () => {
  render(<App />, container);

  const operations = "o-bracket 1 plus 2 c-bracket multiply 3 equals".split(
    " "
  );

  performOperations(operations);

  expect(container.querySelector(".text-input").value).toBe("9");
});

test("can perform operations on decimal numbers", () => {
  render(<App />, container);

  const operations = "0 decimal 3 plus 0 decimal 7 equals".split(" ");

  performOperations(operations);

  expect(container.querySelector(".text-input").value).toBe("1");
});

test("input has a limited length", () => {
  render(<App />, container);

  for (let i = 0; i < 100; i++) {
    const button = container.querySelector(".btn-0");
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  }

  expect(container.querySelector(".text-input").value.length).toBeLessThan(50);
});
