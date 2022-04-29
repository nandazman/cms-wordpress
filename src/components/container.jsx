export default function Container({ children, className }) {
  return <div className={`container mx-auto px-10px ${className || ""}`}>{children}</div>
}
