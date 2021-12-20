export default function InputButtons({ className="", onClick, label }) {
  return (
    <button className={`border-solid font-medium border-2 border-red-600 ${className} h-[5rem] w-auto hover:bg-cyan-200`}  onClick={onClick}>{label}</button>
  )
}