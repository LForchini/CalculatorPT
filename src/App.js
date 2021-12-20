import { useState, useEffect } from 'react';
import InputButtons from './components/InputButtons';
import Evaluate from './components/evaluation';
import Title from "./components/Title";
import History from './components/History'

function App() {
  const [ expr, setExpr ] = useState("0");
  const [clearNext, setClearNext] = useState(true);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);

  useEffect(() => {
    console.log(expr);
  })


  return (
    <>   
      <Title />
      <div className="grid justify-center w-auto auto-cols-min grid-flow-col">
        {/* Calculator */}
        <div className="mr-auto font-bold text-2xl font-mono bg-gradient-to-t from-indigo-500 ml-auto border-solid border-2 border-black lg:h-min 2xl:h-min w-[325px] rounded-2xl p-2">
          <input className="border-solid border-2 border-black text-right w-full h-14" type="text" value={expr} onChange={(e) => {setExpr(e.target.value);}} />
          {/* Buttons */}
          <div className="grid justify-center items-center grid-cols-4 w-auto ">
            <InputButtons className="bg-green-500" onClick={() => {setExpr(""); setClearNext(false);}} label="Clr" />
            <InputButtons onClick={() => {setExpr((clearNext ? "":expr.substring(0, expr.length - 1))); setClearNext(false);}} label="Del" />
            <InputButtons onClick={() => {setExpr(expr + "("); setClearNext(false);}} label="(" />
            <InputButtons onClick={() => {setExpr(expr + ")"); setClearNext(false);}} label=")" />
            

            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "7"); setClearNext(false);}} label="7" />
            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "8"); setClearNext(false);}} label="8" />
            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "9"); setClearNext(false);}} label="9" />
            <InputButtons onClick={() => {setExpr(expr + "*"); setClearNext(false);}} label="*" />

            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "4"); setClearNext(false);}} label="4" />
            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "5"); setClearNext(false);}} label="5" />
            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "6"); setClearNext(false);}} label="6" />
            <InputButtons onClick={() => {setExpr(expr + "-"); setClearNext(false);}} label="-" />

            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "1"); setClearNext(false);}} label="1" />
            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "2"); setClearNext(false);}} label="2" />
            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "3"); setClearNext(false);}} label="3" />
            <InputButtons onClick={() => {setExpr(expr + "+"); setClearNext(false);}} label="+" />

            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "."); setClearNext(false);}} label="." />
            <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "0"); setClearNext(false);}} label="0" />
            <InputButtons onClick={() => {Evaluate(expr, setExpr, setHistory); setClearNext(true);}} label="=" />
            <InputButtons onClick={() => {setExpr(expr + "/"); setClearNext(false);}} label="÷" />
          </div>
        </div>
        <History history={history} setHistory={setHistory} setExpr={setExpr} setClearNext={setClearNext}/>
      </div>
    </>
  );
}

export default App;
