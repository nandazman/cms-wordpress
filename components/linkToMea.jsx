export default function LinkToMea({ to, label, text, children }) {
  const href = `${process.env.NEXT_PUBLIC_BASE_URL_MEA || ""}${to}`;
  return (
    <a aria-label={label} href={href}>
      {text || children}
    </a>
  );
}
