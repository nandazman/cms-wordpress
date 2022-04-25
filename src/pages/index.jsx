import Head from 'next/head';
import { useCallback, useState } from 'react';
import Container from '../components/container';
import SearchInput from '../components/input/search';
import Layout from '../components/layout';
import PaginationButtons from "../components/pagination/buttons";
import PostLists from '../components/post-lists';
import { fetchPostForHome } from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import { getAllPostsForHome } from '../lib/wordpressAPI';

const initPagination = {
  first: null,
  last: null,
  after: null,
  before: null,
};

export default function Index({ allPosts: { edges, pageInfo }, preview }) {
  const [posts, setPosts] = useState(edges);
  const [info, setInfo] = useState(pageInfo);

  const onPaginationClick = useCallback(
    (variables) => {
      getPost(variables);
    },
    [pageInfo]
  );
  const getPost = async (variables) => {
    const { edges, pageInfo } = await fetchPostForHome({
      ...initPagination,
      ...variables,
    });
    setPosts(edges);
    setInfo(pageInfo)
  }
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container className="mt-30px">
          <SearchInput className="mb-48px max-w-screen-md mx-auto" />
          <PostLists className="mb-50px" posts={posts} />
          <PaginationButtons
            pageInfo={info}
            className="mb-30px"
            onClick={onPaginationClick}
          />
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const allPosts = await getAllPostsForHome({
    ...initPagination,
    first: 6
  });
  return {
    props: { allPosts },
  };
}