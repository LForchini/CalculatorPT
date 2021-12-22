export default function InputButtons({ className = "", onClick, label }) {
  return (
    <button
      className={`border-solid font-medium border-2 border-white/5 bg-white/25 h-[5rem] w-auto hover:bg-indigo-400 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
