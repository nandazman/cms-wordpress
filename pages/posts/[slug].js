import { useAmp } from "next/amp"
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import MoreStories from '../../components/more-stories'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import PostTitle from '../../components/post-title'
import SectionSeparator from '../../components/section-separator'
import Tags from '../../components/tags'
import { getPostAndMorePosts } from "../../lib/api"
import { CMS_NAME } from '../../lib/constants'

export const config = {
  amp: 'hybrid',
}

export default function Post({ post, posts, preview }) {
  const isAmp = useAmp();
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
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
                isAmp={isAmp}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && (
              <MoreStories posts={morePosts} isAmp={isAmp} />
            )}
          </>
        )}
      </Container>
    </Layout>
  );
}

// export async function getStaticProps({ params, preview = false, previewData }) {
//   console.log({ params, preview, previewData })
//   const data = await getPostAndMorePosts(params.slug, preview, previewData)

//   return {
//     props: {
//       preview,
//       post: data.post,
//       posts: data.posts,
//     },
//   }
// }

// export async function getStaticPaths() {
//   const allPosts = await getAllPostsWithSlug()

//   return {
//     paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
//     fallback: true,
//   }
// }

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
