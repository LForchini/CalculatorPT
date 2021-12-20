export default function InputButtons({ onClick, label }) {
    return (
        <button className="border-solid border-2 border-indigo-600" onClick={onClick}>{label}</button>
    )
}