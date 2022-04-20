export default function Categories({ categories }) {
  const filterUncategorized = (categories) => {
    if (categories?.edges?.length > 0) {
      return categories.edges.filter(
        (category) => category.node.name !== "Uncategorized"
      );
    }

    const category = categories?.edges?.node?.name;
    return category === "Uncategorized" ? "" : category;
  };

  const filteredCategories = filterUncategorized(categories);

  return (
    <span>
      {filteredCategories.length > 0 ? (
        categories.edges.map((category, index) => (
          <span
            key={index}
            className="rounded-[5px] text-small text-white bg-orange px-3 py-2"
          >
            {category.node.name}
          </span>
        ))
      ) : (
        <></>
      )}
    </span>
  );
}
