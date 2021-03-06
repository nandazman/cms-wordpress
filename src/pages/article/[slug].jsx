import dynamic from "next/dynamic";
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Avatar from "../../components/avatar";
import BreadCrumb from '../../components/breadcrumb';
import Container from '../../components/container';
import Layout from '../../components/layout';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import PostShare from '../../components/post-share';
import PostTitle from '../../components/post-title';
import Tags from '../../components/tags';
import { getPostAndMorePosts } from "../../lib/wordpressAPI";

const PostListByCategory = dynamic(() =>
  import("../../components/post-category-recommend")
);

const SideArticle = dynamic(() =>
  import("../../components/side-article")
);

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
              <BreadCrumb className="lg:mb-48px mb-24px" menu={getMenu()} />
              <div className="article-content">
                <main className="lg:mb-0 mb-24px">
                  <PostHeader
                    link={post.slug}
                    title={post.title}
                    date={post.date}
                  />
                  <PostBody content={post.content} />
                  <div className="mb-32px">
                    {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                  </div>
                  <div className="mb-48px">
                    <PostShare link={post.slug} title={post.title} />
                  </div>
                  <div className="mb-48px lg:flex hidden">
                    <PostListByCategory
                      currentId={post.databaseId}
                      category={category}
                    />
                    </div>
                    <div className="mb-48px">
                      <Avatar author={post.author} />
                    </div>
                </main>
                <SideArticle posts={morePosts} />
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
