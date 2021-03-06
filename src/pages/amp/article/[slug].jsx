import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Container from '../../../components/container'
import Layout from '../../../components/layout'
import PostBody from '../../../components/post-body'
import PostHeader from '../../../components/post-header'
import PostLists from '../../../components/post-lists'
import PostTitle from '../../../components/post-title'
import SectionSeparator from '../../../components/section-separator'
import Tags from '../../../components/tags'
import { getPostAndMorePosts } from "../../../lib/wordpressAPI"

export const config = {
  amp: true,
}

export default function Post({ post, posts, preview }) {
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  Komuntas Mea Artikel | {post.title}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.sourceUrl}
                />
              </Head>
              <PostHeader
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
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && (
              <PostLists posts={morePosts} />
            )}
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
