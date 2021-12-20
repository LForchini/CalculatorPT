import { evaluate } from "mathjs";

/**
 * Evaluates the mathematical expression `expr` and calls `setExpr` to modify the state.
 * @param {String} expr
 * @param {*} setExpr

 */
export default function Evaluate(expr, setExpr, setClearNext) {
  let output = evaluate(expr).toString();
  setClearNext(true);
  setExpr(output);
}
