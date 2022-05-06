import dynamic from "next/dynamic";
import Head from 'next/head';
import { useCallback, useState } from 'react';
import Container from '../components/container';
import SearchInput from '../components/input/search';
import Layout from '../components/layout';
import PaginationButtons from "../components/pagination/buttons";
import PostLists from '../components/post-lists';
import { fetchPostForHome } from '../lib/api';
import { getAllPostByPagination } from '../lib/wordpressAPI';

const Banner = dynamic(() => import("../components/banner"));
const ArticleTabs = dynamic(() => import("../components/article-tabs"));

const initPagination = {
  first: null,
  last: null,
  after: null,
  before: null,
};

export default function Index({ allPosts: { edges, pageInfo }, preview }) {
  const [posts, setPosts] = useState(edges);
  const [info, setInfo] = useState({ ...pageInfo, page: 1 });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const onPaginationClick = useCallback(
    (variables, increment) => {
      setLoading(true);
      const filter = activeTab
        ? { filterType: "categoryName", filter: activeTab }
        : {};
      getPost({ ...variables, ...filter }, increment);
    },
    [pageInfo, activeTab]
  );

  const onChangeActiveTab = useCallback((activeTab) => {
    setLoading(true);
    if (activeTab === "artikel-terbaru") {
      getPost({ first: 6 });
      setActiveTab("");
      return;
    }
    setActiveTab(activeTab);
    getPost({ first: 6, filterType: "categoryName", filter: activeTab });
  })
  
  const getPost = async (variables, increment = 0) => {
    const { edges, pageInfo } = await fetchPostForHome({
      ...initPagination,
      ...variables,
    });
    setPosts(edges);
    setInfo((oldInfo) => {
      return {
        ...pageInfo,
        page: increment ? oldInfo.page + increment : 1,
      };
    });
    setLoading(false);
  };
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Komuntas Mea Artikel</title>
        </Head>
        <Container className="mt-30px">
          <Banner className="mb-48px" />
          <SearchInput className="mb-48px max-w-screen-md mx-auto" />
          <ArticleTabs onChangeActiveTab={onChangeActiveTab} />
          <PostLists className="mb-50px" loading={loading} posts={posts} />
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
  const allPosts = await getAllPostByPagination({
    ...initPagination,
    first: 6
  });
  return {
    props: { allPosts },
  };
}