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
        {history.map((item) => (
          <li key={item.id}>
            <p
              className="cursor-pointer underline text-blue-500"
              onClick={() => {
                setExpr(item.text);
                setClearNext(true);
              }}
            >
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
