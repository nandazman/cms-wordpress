import SearchInput from "./input/search";
import PostCategoryList from "./post-category-list";
import PostLists from "./post-lists";

export default function SideArticle({ posts }) {
  return (
    <article>
      <SearchInput className="mb-48px max-w-screen-md mx-auto" />
      <PostCategoryList />
      {posts.length > 0 && <PostLists previewInArticle posts={posts} />}
    </article>
  );
}