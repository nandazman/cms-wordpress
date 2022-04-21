import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BreadCrumb from '../../components/breadcrumb';
import Container from '../../components/container';
import Layout from '../../components/layout';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import PostLists from '../../components/post-lists';
import PostTitle from '../../components/post-title';
import SectionSeparator from '../../components/section-separator';
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
      return category.node || null;
    }

    const category = categories?.edges?.node?.name;
    return category === "Uncategorized" ? null : categories?.edges?.node;
  };

  const getMenu = () => {
    const category = getCategory(post.categories);
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
              <div className={style.content}>
                <main>
                  <PostHeader
                    link={post.slug}
                    title={post.title}
                    coverImage={post.featuredImage}
                    date={post.date}
                    author={post.author}
                    categories={post.categories}
                  />
                  <PostBody content={post.content} />
                  <footer>
                    {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                  </footer>
                </main>
                <article>hehe</article>
              </div>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <PostLists posts={morePosts} />}
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
      preview,
      post: data.post,
      posts: data.posts,
    },
  };
}
