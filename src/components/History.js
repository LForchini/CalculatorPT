export default function History({
  history,
  setHistory,
  setExpr,
  setClearNext,
}) {
  return (
    <div className="ml-5">
      <h2 className="font-bold text-2xl">History</h2>
      <button
        className="border-2 border-black p-1 rounded-xl pt-0 pb-0 hover:bg-blue-300"
        onClick={() => {
          localStorage.clear();
          setHistory([]);
        }}
      >
        Clear
      </button>
      <ul className="list-none">
        {history.map((item) => {
          let t = item.text;
          if (t.length > 15) t = `${t.substring(0, 15 - 3)}...`;
          return (
            <li key={item.id}>
              <p
                className="cursor-pointer underline text-blue-500 font-mono"
                onClick={() => {
                  setExpr(item.text);
                  setClearNext(true);
                }}
              >
                {t}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
