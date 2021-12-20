import { evaluate } from "mathjs";

/**
 * Evaluates the mathematical expression `expr` and calls `setExpr` to modify the state.
 * @param {String} expr
 * @param {*} setExpr

 */
function Evaluate(expr, setExpr) {
  let output = evaluate(expr).toString();
  setExpr(output);
}

module.exports = Evaluate;
