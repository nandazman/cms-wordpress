import { memo, useState } from "react";
// import { fetchPostForRecommendedCategory } from "../lib/api";

function PostCategoryList() {
  const [data, setData] = useState([]);

  // const getPost = async () => {
  //   const data = await fetchPostForRecommendedCategory({
  //     category: category.slug,
  //     currentId,
  //   });
  //   setData(data.edges || []);
  // };
  // useEffect(() => {
  //   getPost();
  // }, [category]);

  if (!data.length) return <></>;

  return (
    <div>
      <p className="mb-32px text-large text-dark-blue font-semibold">
        Kategory
      </p>
    </div>
  );
}

export default memo(PostCategoryList)