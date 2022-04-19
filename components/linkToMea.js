export default function LinkToMea({ to, label, text, children }) {
  return (
    <a aria-label={label} href={`${process.env.BASE_URL_MEA}${to}`}>
      {text || children}
    </a>
  );
}
