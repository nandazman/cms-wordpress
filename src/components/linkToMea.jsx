export default function LinkToMea({ to, label, text, children, className, onClick }) {
  const href = `${process.env.NEXT_PUBLIC_BASE_URL_MEA || ""}${to}`;
  return (
    <a
      aria-label={label}
      className={className || ""}
      href={to ? href : "#"}
      onClick={onClick}
    >
      {text || children}
    </a>
  );
}
