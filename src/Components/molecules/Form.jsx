export default function Form({ onSubmit, children, className = "" }) {
  return (
    <form className={`space-y-4 ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
