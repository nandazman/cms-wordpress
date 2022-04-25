import { memo } from 'react';
import PostPreview from './post-preview';

function PostList({ posts, className, previewInArticle, row }) {

  const getClassNameArticle = () => {
    if (previewInArticle) return "gap-y-20px";
    if (row) return "gap-y-48px flex flex-col";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[37px] md:gap-x-[16px] lg:gap-y-[48px] gap-y-[30px]";
  }
  const classNameArticle = getClassNameArticle();
  return (
    <section className={className || ""}>
      {previewInArticle ? (
        <p className="mb-32px text-large text-dark-blue font-semibold">
          Artikel Terbaru
        </p>
      ) : (
        <></>
      )}
      <div className={classNameArticle}>
        {posts.map(({ node }) => (
          <PostPreview
            row={row}
            previewInArticle={previewInArticle}
            key={node.slug}
            title={node.title}
            categories={node.categories}
            coverImage={node.featuredImage}
            date={node.date}
            author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(PostList)