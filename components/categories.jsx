export default function Categories({ categories }) {
  return (
    <span>
      {categories?.edges?.length > 0 ? (
        categories.edges.map((category, index) => (
          <span
            key={index}
            className="rounded-[5px] text-small text-white bg-orange px-3 py-2"
          >
            {category.node.name}
          </span>
        ))
      ) : (
        <span className="rounded-[5px] text-small text-white bg-orange px-3 py-2">
          {categories?.edges?.node?.name}
        </span>
      )}
    </span>
  );
}
