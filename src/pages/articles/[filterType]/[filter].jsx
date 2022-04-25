import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadcrumb";
import Container from "../../../components/container";
import Layout from "../../../components/layout";
import PaginationButtons from "../../../components/pagination/buttons";
import PostLists from "../../../components/post-lists";
import SideArticle from "../../../components/side-article";
import { fetchPostByFilter } from "../../../lib/api";
import { getAllPostByPagination } from "../../../lib/wordpressAPI";

const initPagination = {
  first: null,
  last: null,
  after: null,
  before: null,
};

const filterTypeMap = {
  category: "categoryName",
  tag: "tag",
  author: "authorName",
  search: "search",
};

const filterTypeTranslate = {
  category: "Kategori",
  tag: "Tag",
  author: "Author",
  search: "Pencarian",
};

export default function Index({ allPosts: { edges, pageInfo } }) {
  const [posts, setPosts] = useState(edges);
  const [info, setInfo] = useState(pageInfo);
  const [init, setInit] = useState(true);
  const [latest, setLatest] = useState([]);
  const router = useRouter();

  const onPaginationClick = useCallback(
    (variables) => {
      getPost(variables);
    },
    [pageInfo]
  );
  const getPost = async (variables) => {
    const filterType = filterTypeMap[router.query.filterType];
    const { edges, pageInfo } = await fetchPostByFilter({
      ...initPagination,
      ...variables,
      filterType,
      filter: router.query.filter,
    });
    setPosts(edges);
    setInfo(pageInfo);
  };

  const getLatestPost = async () => {
    const data = await fetchPostByFilter({
      ...initPagination,
      first: 3
    });
    setLatest(data.edges);
  }

  const getCurrentPageMenu = () => {
    const filterType = router.query.filterType;
    if (filterType === "search" || filterType === "author")
      return router.query.filter;
    
    if (posts.length === 0) return "";

    if (filterType === "tag") {
      const tag = posts[0].node.tags.edges.find(
        (item) => item.node.slug === router.query.filter
      );
      return tag?.node?.name || "";
    }

    if (filterType === "category") {
      const category = posts[0].node.categories.edges.find(
        (item) => item.node.slug === router.query.filter
      );
      return category?.node?.name || "";
    }

    return "";
  }

  useEffect(() => {
    if (
      !router.isFallback &&
      !posts?.length &&
      router.query.filterType !== "search"
    ) {
      router.push("/");
      return;
    }

    if (init) {
      setInit(false);
      getLatestPost();
    } else {
      getPost();
    }
  }, [router.query.filter]);


  const currentMenu = getCurrentPageMenu();
  const type = filterTypeTranslate[router.query.filterType];
  const getMenu = () => {
    return [
      { text: "Home", link: "/" },
      {
        text: type,
      },
      { text: currentMenu },
    ];
  };


  return (
    <>
      <Layout>
        <Container>
          <Head>
            <title>
              {type} {currentMenu}
            </title>
          </Head>

          <BreadCrumb className="mb-32px" menu={getMenu()} />

          <div className="article-content">
            <main>
              <div className="mb-32px">
                <p className="mb-0 text-dark-grey text-medium font-semibold">
                  {type}
                </p>
                <h2 className="text-h2 text-dark-blue font-bold">
                  {currentMenu}
                </h2>
              </div>
              <div className="mb-32px">
                <PostLists row posts={posts} />
              </div>

              <PaginationButtons
                pageInfo={info}
                className="mb-30px"
                onClick={onPaginationClick}
                limit={5}
              />
            </main>

            <SideArticle posts={latest} />
          </div>
        </Container>
      </Layout>
    </>
  );
}

// export async function getStaticProps({ preview = false }) {
//   const allPosts = await getAllPostByPagination(preview)

//   return {
//     props: { allPosts, preview },
//   }
// }

export async function getServerSideProps({ params }) {
  const filterType = filterTypeMap[params.filterType];

  if (!filterType) return { props: { allPosts: [] } }
  const allPosts = await getAllPostByPagination({
    ...initPagination,
    filterType,
    filter: params.filter,
    first: 5,
  });

  return {
    props: { allPosts },
  };
}
