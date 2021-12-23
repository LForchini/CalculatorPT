class BigNumD {
  constructor(v, normalised = false) {
    this.toString = () => {
      let value = this.v.toString().split("");
      value.reverse();
      value.splice(Number(BigNumD.p), 0, ".");
      if (BigNumD.p + 1n === BigInt(value.length)) value.push("0");
      value.reverse();
      while (value[value.length - 1] === "0") value.pop();
      if (value[value.length - 1] === ".") value.pop();
      if (value.length === 0) value.push("0");
      return value.join("");
    };
    this.add = (other) => {
      return new BigNumD(other.v + this.v, true);
    };
    this.sub = (other) => {
      return new BigNumD(this.v - other.v, true);
    };
    this.mult = (other) => {
      return new BigNumD((other.v * this.v) / 10n ** BigNumD.p, true);
    };
    this.div = (other) => {
      return new BigNumD((this.v * 10n ** BigNumD.p) / other.v, true);
    };
    let factor = 1n;
    if (!normalised) factor = 10n ** BigNumD.p;
    this.v = v * factor;
  }
}
BigNumD.p = 15n;
class EvalNode {
  constructor() {
    this.args = [];
    this.nargs = -1;
    this.index = 0;
    this.instruction = "";
    this.priority = 0;
    this.addNode = (n) => {
      if (this.args.length === this.nargs) {
        let child = this.args[this.args.length - 1];
        if (child.nargs === 0 || child.priority <= n.priority) {
          if (n.nargs === 0) throw new Error("Invalid Expression");
          n.addNode(child);
          this.args[this.args.length - 1] = n;
        } else {
          child.addNode(n);
        }
      } else {
        this.args.push(n);
      }
    };
  }
}
class EvalCompiled {
  constructor() {
    this.instructions = [];
    this.evaluate = (o) => {
      let stack = [];
      this.instructions.forEach((value) => {
        switch (value.split(" ")[0]) {
          case "push_literal":
            let v = value.split(" ")[1];
            let b = false;
            if (v.includes(".")) {
              let x = v.split(".");
              v = x[0];
              for (let i = 0; i < BigNumD.p; i++) {
                v += x[1][i] ? x[1][i] : "0";
              }
              b = true;
            }
            stack.push(new BigNumD(BigInt(v), b));
            break;
          case "add":
            stack.push(stack.pop().add(stack.pop()));
            break;
          case "mult":
            stack.push(stack.pop().mult(stack.pop()));
            break;
          case "sub":
            {
              const [a, b] = [stack.pop(), stack.pop()];
              stack.push(b.sub(a));
            }
            break;
          case "div":
            {
              const [a, b] = [stack.pop(), stack.pop()];
              stack.push(b.div(a));
            }
            break;
          default:
            break;
        }
      });
      return stack.pop();
    };
  }
}
function generateNodeList(s) {
  let list = [];
  let accumulator = "";
  s.split("").forEach((element) => {
    if (["+", "-", "*", "/", "(", ")", " "].includes(element)) {
      if (accumulator !== "") {
        let newNode = new EvalNode();
        newNode.instruction = `push_literal ${accumulator}`;
        newNode.nargs = 0;
        list.push(newNode);
        accumulator = "";
      }
      let newNode = new EvalNode();
      switch (element) {
        case "+":
          newNode.instruction = "add";
          newNode.nargs = 2;
          newNode.priority = 4;
          break;
        case "-":
          newNode.instruction = "sub";
          newNode.nargs = 2;
          newNode.priority = 5;
          break;
        case "*":
          newNode.instruction = "mult";
          newNode.nargs = 2;
          newNode.priority = 3;
          break;
        case "/":
          newNode.instruction = "div";
          newNode.nargs = 2;
          newNode.priority = 2;
          break;
        case "(":
          newNode.instruction = "open";
          newNode.nargs = 0;
          newNode.priority = 0;
          break;
        case ")":
          newNode.instruction = "close";
          newNode.nargs = 0;
          newNode.priority = 0;
          break;
        default:
          break;
      }
      if (newNode.instruction) list.push(newNode);
    } else {
      accumulator = `${accumulator}${element}`;
    }
  });
  if (accumulator !== "") {
    let newNode = new EvalNode();
    newNode.instruction = `push_literal ${accumulator}`;
    newNode.nargs = 0;
    list.push(newNode);
    accumulator = "";
  }
  return list;
}
function parse(s) {
  let instructions = generateNodeList(s);
  let root = new EvalNode();
  root.nargs = 1;
  root.instruction = "root";
  let stack = [root];
  instructions.forEach((element) => {
    let root = stack.pop();
    if (element.instruction === "open") {
      let newRoot = new EvalNode();
      newRoot.nargs = 1;
      newRoot.instruction = "root";
      stack.push(root);
      stack.push(newRoot);
    } else if (element.instruction === "close") {
      let parentRoot = stack.pop();
      root.args[0].priority = 0;
      parentRoot.addNode(root.args[0]);
      stack.push(parentRoot);
    } else {
      root.addNode(element);
      stack.push(root);
    }
  });
  return stack.pop().args[0];
}
function compile(n) {
  let queue = [n];
  let instructions = [];
  while (queue.length > 0) {
    let current = queue.pop();
    if (current.args.length == current.index) {
      current.index = 0;
      instructions.push(current.instruction);
    } else {
      queue.push(current);
      queue.push(current.args[current.index]);
      current.index++;
    }
  }
  let compiled = new EvalCompiled();
  compiled.instructions = instructions;
  return compiled;
}
function evaluate(s, o) {
  let main_node = parse(s);
  let compiled = compile(main_node);
  let result = compiled.evaluate(o);
  return result;
}

export default function Evaluate(expr, setExpr, setHistory) {
  let output;
  try {
    output = evaluate(expr);
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let nextId = 0;
    if (history.length > 0)
      nextId =
        history.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
    if (history.length > 15) {
      let lowestId = history.reduce((min, item) =>
        item.id < min ? item.id : min
      ).id;
      history = history.filter((item) => item.id !== lowestId);
    }
    history.push({ text: expr, id: nextId });
    setHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
    output = output.toString();
  } catch (error) {
    output = "Error";
    console.log(error);
  }
  setExpr(output);
}
