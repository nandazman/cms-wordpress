import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../../components/container";
import Layout from "../../../components/layout";
import PostLists from "../../../components/post-lists";
import { CMS_NAME } from "../../../lib/constants";
import { getAllPostsByFilter } from "../../../lib/wordpressAPI";

export default function Index({ allPosts: { edges } }) {
  const router = useRouter();
  const posts = edges;

  if (!router.isFallback && !posts?.length) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <PostLists posts={posts} />
        </Container>
      </Layout>
    </>
  );
}

// export async function getStaticProps({ preview = false }) {
//   const allPosts = await getAllPostsForHome(preview)

//   return {
//     props: { allPosts, preview },
//   }
// }

export async function getServerSideProps({ params }) {
  const filterTypeMap = {
    category: "categoryName",
    tag: "tag",
    author: "authorName",
    search: "search"
  };

  const filterType = filterTypeMap[params.filterType];

  if (!filterType) return { props: { allPosts: [] } }
  const allPosts = await getAllPostsByFilter({
    filterType,
    filter: params.filter,
  });

  return {
    props: { allPosts },
  };
}
