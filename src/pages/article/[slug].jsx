import cn from 'classnames';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BreadCrumb from '../../components/breadcrumb';
import Container from '../../components/container';
import SearchInput from "../../components/input/search";
import Layout from '../../components/layout';
import PostBody from '../../components/post-body';
import PostListByCategory from "../../components/post-category-recommend";
import PostHeader from '../../components/post-header';
import PostLists from '../../components/post-lists';
import PostShare from '../../components/post-share';
import PostTitle from '../../components/post-title';
import Tags from '../../components/tags';
import { getPostAndMorePosts } from "../../lib/wordpressAPI";
import style from "./article.module.scss";

export default function Post({ post, posts, preview }) {
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  const getCategory = (categories) => {
    if (!categories) return;
    if (categories?.edges?.length > 0) {
      const category = categories.edges.find(
        (category) => category.node.name !== "Uncategorized"
      );
      return category?.node || null;
    }

    const category = categories?.edges?.node?.name;
    return category === "Uncategorized" ? null : categories?.edges?.node;
  };

  const category = getCategory(post.categories);

  const getMenu = () => {
    if (category) {
      return [
        { text: "Home", link: "/" },
        { text: category.name, link: `/articles/category/${category.slug}` },
        { text: post.title },
      ];
    }
    return [{ text: "Home", link: "/" }, { text: post.title }];
  };

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title} | Komunitas MEA</title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.sourceUrl}
                />
              </Head>
              <BreadCrumb menu={getMenu()} />
              <div className={cn(style.content, "lg:gap-x-32px")}>
                <main className="lg:mb-0 mb-24px">
                  <PostHeader
                    link={post.slug}
                    title={post.title}
                    date={post.date}
                    author={post.author}
                    categories={post.categories}
                  />
                  <PostBody content={post.content} />
                  <div className="mb-32px">
                    {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                  </div>
                  <div className="mb-48px">
                    <PostShare link={post.slug} title={post.title} />
                  </div>
                  <div className="mb-48px">
                    <PostListByCategory category={category} />
                  </div>
                </main>
                <article>
                  <SearchInput className="mb-48px max-w-screen-md mx-auto" />
                  {morePosts.length > 0 && (
                    <PostLists previewInArticle posts={morePosts} />
                  )}
                </article>
              </div>
            </article>

          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({
  params,
  preview = false,
  previewData,
}) {
  const data = await getPostAndMorePosts(params.slug, preview, previewData);
  return {
    props: {
      post: data.post,
      posts: data.posts,
    },
  };
}
