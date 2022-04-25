import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { fetchPostForRecommendedCategory } from "../lib/api";

function PostListByCategory({ category, currentId }) {
  if (!category) return <></>;

  const [data, setData] = useState([]);

  const getPost = async () => {
    
    try {
      const data = await fetchPostForRecommendedCategory({
        category: category.slug,
        currentId,
      });
      setData(data.edges || []);
    } catch (err) {
      console.error({ err });
    }
  }
  useEffect(() => {
    getPost();
  }, [category]);

  if (!data.length) return <></>;

  return (
    <section className="flex gap-32px flex-wrap">
      {data.map(({ node: { title, slug } }) => {
        return (
          <Link href={`/article/${slug}`} key={slug}>
            <a className="text-dark-grey flex-auto w-52 cursor-pointer line-clamp-2">
              {title}
            </a>
          </Link>
        );
      })}
    </section>
  );
}

export default memo(PostListByCategory);
