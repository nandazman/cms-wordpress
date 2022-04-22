export default function LinkToMea({ to, label, text, children, className }) {
  const href = `${process.env.NEXT_PUBLIC_BASE_URL_MEA || ""}${to}`;
  return (
    <a aria-label={label} className={className || ""} href={href}>
      {text || children}
    </a>
  );
}
