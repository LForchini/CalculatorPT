import { evaluate } from "mathjs";

/**
 * Evaluates the mathematical expression `expr` and calls `setExpr` to modify the state.
 * @param {String} expr
 * @param {*} setExpr

 */
export default function Evaluate(expr, setExpr) {
  let output;
  try {
    output = evaluate(expr).toString();
    let history = JSON.parse(localStorage.getItem('history')) || [];
    let nextId = 0;
    if (history.length > 0) nextId = history.reduce((max, item) => (item.id > max ? item.id : max)) + 1;
    history.push({text: expr, id: nextId});
    localStorage.setItem('history', JSON.stringify(history));
  } catch (error) {
    output = "Error"
    console.log(error)
  }
  setExpr(output);
}
