export default function PostTitle({ children }) {
  return (
    <h2
      className="text-h2 font-bold lg:mb-24px mb-20px font-bold text-dark-blue"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
