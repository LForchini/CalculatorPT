import { evaluate } from "mathjs";

export default function Evaluate(
  expr,
  setExpr,
  setHistory,
  ans = 0,
  setAns = () => {}
) {
  let output;
  try {
    output = evaluate(expr, { Ans: ans });
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
    setAns(output);
    output = output.toString();
  } catch (error) {
    output = "Error";
    console.log(error);
  }
  setExpr(output);
}
