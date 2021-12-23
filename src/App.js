import { useState } from "react";
import { Howl } from "howler";
import InputButtons from "./components/InputButtons";
import Evaluate from "./components/evaluation";
import Title from "./components/Title";
import History from "./components/History";
import { fractionDependencies } from "mathjs";

function App() {
  const [expr, setExprBase] = useState("0");
  const [clearNext, setClearNext] = useState(true);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const MAX_DIGITS = 24;

  function playErrorAudio() {
    var sound = new Howl({
      src: ["https://soundbible.com/mp3/Computer%20Error%20Alert-SoundBible.com-783113881.mp3"],
      html5: true
    });
    sound.play();
  }

  function setExpr(expr) {
    if (expr.length > MAX_DIGITS) {
      playErrorAudio();
      return;
    }
    setExprBase(expr);
  }

  return (
    <>
      <Title />
      <div className="grid justify-center w-auto auto-cols-min grid-flow-col">
        {/* Calculator */}
        <div className="font-bold text-2xl font-mono h-min w-[325px] rounded-2xl">
          <p
            className={`text-sm text-red-500 text-center ${
              expr.length === MAX_DIGITS ? "visible" : "hidden"
            }`}
          >
            Character limit reached
          </p>
          <input
            className={`text-input border-solid border-2  ${
              expr.length === MAX_DIGITS
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
              expr={expr}
              max_digits={MAX_DIGITS + 1}
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
              expr={expr}
              max_digits={MAX_DIGITS + 1}
            />
            <InputButtons
              className="btn-o-bracket"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "(");
                setClearNext(false);
              }}
              label="("
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-c-bracket"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + ")");
                setClearNext(false);
              }}
              label=")"
              expr={expr}
              max_digits={MAX_DIGITS}
            />

            <InputButtons
              className="btn-7"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "7");
                setClearNext(false);
              }}
              label="7"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-8"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "8");
                setClearNext(false);
              }}
              label="8"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-9"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "9");
                setClearNext(false);
              }}
              label="9"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-multiply"
              onClick={() => {
                setExpr(expr + "*");
                setClearNext(false);
              }}
              label="*"
              expr={expr}
              max_digits={MAX_DIGITS}
            />

            <InputButtons
              className="btn-4"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "4");
                setClearNext(false);
              }}
              label="4"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-5"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "5");
                setClearNext(false);
              }}
              label="5"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-6"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "6");
                setClearNext(false);
              }}
              label="6"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-minus"
              onClick={() => {
                setExpr(expr + "-");
                setClearNext(false);
              }}
              label="-"
              expr={expr}
              max_digits={MAX_DIGITS}
            />

            <InputButtons
              className="btn-1"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "1");
                setClearNext(false);
              }}
              label="1"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-2"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "2");
                setClearNext(false);
              }}
              label="2"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-3"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "3");
                setClearNext(false);
              }}
              label="3"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-plus"
              onClick={() => {
                setExpr(expr + "+");
                setClearNext(false);
              }}
              label="+"
              expr={expr}
              max_digits={MAX_DIGITS}
            />

            <InputButtons
              className="rounded-bl-2xl btn-decimal"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + ".");
                setClearNext(false);
              }}
              label="."
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="btn-0"
              onClick={() => {
                setExpr((clearNext ? "" : expr) + "0");
                setClearNext(false);
              }}
              label="0"
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className={`${
                expr.length === MAX_DIGITS ? "bg-red-500" : "bg-green-500"
              } btn-equals`}
              onClick={() => {
                if (expr.length !== MAX_DIGITS) {
                  Evaluate(expr, setExpr, setHistory);
                  setClearNext(true);
                } else playErrorAudio();
              }}
              label="="
              expr={expr}
              max_digits={MAX_DIGITS}
            />
            <InputButtons
              className="rounded-br-2xl btn-divide"
              onClick={() => {
                setExpr(expr + "/");
                setClearNext(false);
              }}
              label="÷"
              expr={expr}
              max_digits={MAX_DIGITS}
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
