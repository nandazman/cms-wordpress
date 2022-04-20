import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import PostLists from '../components/post-lists'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allPosts: { edges, pageInfo }, preview }) {
  console.log({ edges, pageInfo });

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container className="mt-32px">
          <PostLists className="mb-50px" posts={edges} />
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
  };
}