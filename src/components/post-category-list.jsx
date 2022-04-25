import cn from "classnames";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { fetchCategories } from "../lib/api";

function PostCategoryList() {
  const [data, setData] = useState([]);

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      const filteredData = data.filter((item) => item.node.slug !== "uncategorized");
      setData(filteredData || []);
    } catch (err) {
      console.error({ err })
    }
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
      <div className="flex flex-col">
        {data.map(({ node: { name, slug } }, index) => {
          return (
            <Link href={`/articles/category/${slug}`} key={slug}>
              <a
                className={cn(
                  { "pt-20px": index !== 0 },
                  "pb-20px text-normal text-black cursor-pointer line-clamp-2 border-b border-line-grey"
                )}
              >
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