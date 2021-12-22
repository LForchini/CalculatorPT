export default function InputButtons({
  className = "",
  onClick,
  label,
  expr,
  max_digits,
}) {
  return (
    <button
      className={`border-solid font-medium border-2 border-white/5 bg-white/25 h-[5rem] w-auto  ${className} ${
        expr.length === max_digits ? "" : "hover:bg-indigo-400"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
