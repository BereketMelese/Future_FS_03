export default function InputField({ label, id, className = "", ...props }) {
  return (
    <label htmlFor={id} className="block space-y-2">
      <span className="text-sm text-[rgba(245,233,220,0.82)]">{label}</span>
      <input
        id={id}
        className={`h-11 w-full rounded-xl border border-[rgba(245,233,220,0.16)] bg-[rgba(245,233,220,0.05)] px-4 text-sm text-(--secondary) outline-none transition duration-200 hover:border-[rgba(245,233,220,0.34)] hover:bg-[rgba(245,233,220,0.09)] focus:border-(--accent) ${className}`}
        {...props}
      />
    </label>
  );
}
