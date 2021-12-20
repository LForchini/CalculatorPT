import Evaluate from "./evaluation";

test("Simple Addition", () => {
  let s = "1 + 2";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("3");
});

test("Simple Subtraction", () => {
  let s = "1 - 2";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("-1");
});

test("Complex Addition", () => {
  let s = "3 + 2 + 4 + 1 + (3 + 1 + 3)";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("17");
});

test("Complex Subtraction", () => {
  let s = "3 - 2 - 4 - 1 - (3 - 1 - 3)";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("-3");
});

test("Multiplication", () => {
  let s = "3 *3";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("9");
});

test("BIDMAS", () => {
  let s = "13 + 5 * 2 - 1";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("22");
});

test("Decimal numbers", () => {
  let s = "20.5 - 1.3";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("19.2");
});

test("Infinity", () => {
  let s = "1 / 0";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("Infinity");
});

test("Negative Infinity", () => {
  let s = "-1/0";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("-Infinity");
});

test("Negative Expressions", () => {
  let s = "5-15";
  Evaluate(s, (o) => {
    s = o;
  });
  expect(s).toBe("-10");
});

//add more test cases such as e^2 if we get to it :)
