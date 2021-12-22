import { useState } from "react";
import InputButtons from "./components/InputButtons";
import Evaluate from "./components/evaluation";
import Title from "./components/Title";
import History from "./components/History";

function App() {
  const [expr, setExprBase] = useState("0");
  const [clearNext, setClearNext] = useState(true);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [ans, setAns] = useState(0);

  function setExpr(expr) {
    if (expr.length < 25) setExprBase(expr);
  }

  return (
    <>
      <Title />
      <div className="grid justify-center w-auto auto-cols-min grid-flow-col">
        {/* Calculator */}
        <div className="font-bold text-2xl font-mono h-min w-[325px] rounded-2xl">
          <input
            className={`text-input border-solid border-2  ${
              expr.length === 24
                ? "border-red-500 bg-red-500/25"
                : "border-black/30 bg-black/25"
            } text-right w-full h-14 rounded-t-2xl outline-none`}
            type="text"
            value={expr}
            onChange={(e) => {
              setExpr(e.target.value);
            }}
            onFocus={() => {
              if (expr === "0") setExpr("");
            }}
            onBlur={() => {
              if (expr === "") setExpr("0");
            }}
          />
          {/* Buttons */}
          <div className="grid justify-center items-center grid-cols-4 w-auto ">
            <InputButtons
              className="btn-clr"
              onClick={() => {
                setExpr("0");
                setClearNext(true);
              }}
              label="Clr"
            />
            <InputButtons
              className="btn-del"
              onClick={() => {
                let nextExpr = clearNext
                  ? "0"
                  : expr.substring(0, expr.length - 1);

                setExpr(nextExpr);

                if (nextExpr === "0") {
                  setClearNext(true);
                } else {
                  setClearNext(false);
                }
              }}
              label="Del"
            />
            <InputButtons
              className="btn-("
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "(");
                setClearNext(false);
              }}
              label="("
            />
            <InputButtons
              className="btn-)"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + ")");
                setClearNext(false);
              }}
              label=")"
            />

            <InputButtons
              className="btn-7"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "7");
                setClearNext(false);
              }}
              label="7"
            />
            <InputButtons
              className="btn-8"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "8");
                setClearNext(false);
              }}
              label="8"
            />
            <InputButtons
              className="btn-9"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "9");
                setClearNext(false);
              }}
              label="9"
            />
            <InputButtons
              className="btn-*"
              onClick={() => {
                setExpr(expr + "*");
                setClearNext(false);
              }}
              label="*"
            />

            <InputButtons
              className="btn-4"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "4");
                setClearNext(false);
              }}
              label="4"
            />
            <InputButtons
              className="btn-5"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "5");
                setClearNext(false);
              }}
              label="5"
            />
            <InputButtons
              className="btn-6"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "6");
                setClearNext(false);
              }}
              label="6"
            />
            <InputButtons
              className="btn--"
              onClick={() => {
                setExpr(expr + "-");
                setClearNext(false);
              }}
              label="-"
            />

            <InputButtons
              className="btn-1"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "1");
                setClearNext(false);
              }}
              label="1"
            />
            <InputButtons
              className="btn-2"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "2");
                setClearNext(false);
              }}
              label="2"
            />
            <InputButtons
              className="btn-3"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "3");
                setClearNext(false);
              }}
              label="3"
            />
            <InputButtons
              className="btn-+"
              onClick={() => {
                setExpr(expr + "+");
                setClearNext(false);
              }}
              label="+"
            />

            <InputButtons
              className="rounded-bl-2xl btn-."
              onClick={() => {
                setExpr((clearNext ? "" : expr) + ".");
                setClearNext(false);
              }}
              label="."
            />
            <InputButtons
              className="btn-0"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "0");
                setClearNext(false);
              }}
              label="0"
            />
            <InputButtons
              className="bg-green-500 btn-="
              onClick={() => {
                Evaluate(expr, setExpr, setHistory, ans, setAns);
                setClearNext(true);
              }}
              label="="
            />
            <InputButtons
              className="rounded-br-2xl btn-/"
              onClick={() => {
                setExpr(expr + "/");
                setClearNext(false);
              }}
              label="÷"
            />
          </div>
        </div>
        <History
          history={history}
          setHistory={setHistory}
          setExpr={setExpr}
          setClearNext={setClearNext}
        />
      </div>
    </>
  );
}

export default App;
