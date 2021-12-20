import { useState, useEffect } from 'react';
import InputButtons from './components/InputButtons';
import Evaluate from './components/evaluation';
import Title from "./components/Title";

function App() {
  const [ expr, setExpr ] = useState("0")
  const [clearNext, setClearNext] = useState(true);

  useEffect(() => {
    console.log(expr);
  })


  return (
    <>   
      <Title />
      <div className="grid justify-center w-auto auto-cols-min grid-flow-col">
        {/* Calculator */}
        <div className="font-bold text-2xl font-mono border-solid border-2 border-black w-[325px] rounded-2xl p-2 bg-gradient-to-t from-indigo-500 ml-auto mr-auto">
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
            <InputButtons onClick={() => {Evaluate(expr, setExpr); setClearNext(true);}} label="=" />
            <InputButtons onClick={() => {setExpr(expr + "/"); setClearNext(false);}} label="÷" />
          </div>
        </div>
        <div className="ml-5">
          <h2 className="font-bold text-2xl">History</h2>
          <ul className='list-disc'>
          {
            (JSON.parse(localStorage.getItem('history')) || []).map((item) => (<li key={item.id}> 
              <p className="cursor-pointer underline text-blue-500" onClick={() => {setExpr(item.text); setClearNext(true)}}>{item.text}</p> 
            </li>))
          }
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
