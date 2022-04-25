import Link from "next/link";

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
          <Link href={`/articles/category/${category.node.slug}`} key={index}>
            <a className="rounded-sm text-small text-white bg-orange px-3 py-2">
              {category.node.name}
            </a>
          </Link>
        ))
      ) : (
        <></>
      )}
    </span>
  );
}
