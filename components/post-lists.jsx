import { memo } from 'react';
import PostPreview from './post-preview';

function PostList({ posts, className }) {
  return (
    <section className={className || ""}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[37px] md:gap-x-[16px] lg:gap-y-[48px] gap-y-[30px]">
        {posts.map(({ node }) => (
          <PostPreview
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