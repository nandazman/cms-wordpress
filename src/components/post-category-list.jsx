import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { fetchCategories } from "../lib/api";

function PostCategoryList() {
  const [data, setData] = useState([]);

  const getCategories = async () => {
    const data = await fetchCategories();
    const filteredData = data.filter((item) => item.node.slug !== "uncategorized");
    setData(filteredData || []);
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (!data.length) return <></>;

  return (
    <div className="mb-48px">
      <p className="mb-32px text-large text-dark-blue font-semibold">
        Kategori
      </p>
      <div className="flex flex-col gap-y-40px">
        {data.map(({ node: { name, slug } }) => {
          return (
            <Link href={`/articles/category/${slug}`} key={slug}>
              <a className="text-normal text-black cursor-pointer line-clamp-2">
                {name}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default memo(PostCategoryList)