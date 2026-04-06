export default function Input({ type = "text", id, name, required = false, placeholder, className = "", ...props }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
      {...props}
    />
  );
}
