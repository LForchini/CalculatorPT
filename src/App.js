import { useState, useEffect } from 'react';
import InputButtons from './components/InputButtons';
import Evaluate from './components/evaluation';

function App() {
  const [ expr, setExpr ] = useState("")
  const [clearNext, setClearNext] = useState(false);

  useEffect(() => {
    console.log(expr);
  })

  return (
    <div className="">
      <label >{expr}</label>
      <InputButtons onClick={() => {Evaluate(expr, setExpr, setClearNext)}} label="=" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "0"); setClearNext(false);}} label="0" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "1"); setClearNext(false);}} label="1" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "2"); setClearNext(false);}} label="2" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "3"); setClearNext(false);}} label="3" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "4"); setClearNext(false);}} label="4" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "5"); setClearNext(false);}} label="5" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "6"); setClearNext(false);}} label="6" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "7"); setClearNext(false);}} label="7" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "8"); setClearNext(false);}} label="8" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr) + "9"); setClearNext(false);}} label="9" />
      <InputButtons onClick={() => {setExpr("")}} label="C" />
      <InputButtons onClick={() => {setExpr((clearNext ? "":expr.substring(0, expr.length - 1))); setClearNext(false);}} label="<" />
      <InputButtons onClick={() => {setExpr(expr + "+")}} label="+" />
    </div>
  );
}

export default App;
