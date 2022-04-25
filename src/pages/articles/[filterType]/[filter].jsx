import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BreadCrumb from "../../../components/breadcrumb";
import Container from "../../../components/container";
import Layout from "../../../components/layout";
import PostLists from "../../../components/post-lists";
import SideArticle from "../../../components/side-article";
import { getAllPostByPagination } from "../../../lib/wordpressAPI";

const initPagination = {
  first: null,
  last: null,
  after: null,
  before: null,
};

export default function Index({ allPosts: { edges } }) {
  const router = useRouter();
  const posts = edges;

  useEffect(() => {
    if (
      !router.isFallback &&
      !posts?.length &&
      router.query.filterType !== "search"
    ) {
      router.push("/");
      return;
    }
  })

  const getMenu = () => {
    return [
      { text: "Home", link: "/" },
      {
        text: router.query.filterType,
      },
      { text: router.query.filter },
    ];
  };

  return (
    <>
      <Layout>
        <Container>
          <Head>
            <title>
              Pencarian {router.query.filterType} {router.query.filter}
            </title>
          </Head>

          <BreadCrumb menu={getMenu()} />

          <div className="article-content">
            <main>
              <PostLists row posts={posts} />
            </main>

            <SideArticle
              posts={[
                {
                  node: {
                    databaseId: 28557,
                    title: "Rahasia Jam Posting Konten di TikTok!",
                    excerpt:
                      "<p>Rahasia Jam Posting Konten di TikTok! Rahasia jam posting &#8211; Kita selalu berdebat dan menentukan waktu untuk memposting konten atau sering dikatakan prime time. Bahkan banyak yang mengikuti strategi orang&#8230; </p>\n",
                    slug: "rahasia-jam-posting-konten-di-tiktok",
                    date: "2022-04-22T17:15:45",
                    featuredImage: null,
                    author: {
                      node: {
                        slug: "fiqhi",
                        firstName: null,
                        lastName: null,
                        name: "fiqhi",
                        avatar: {
                          url: "https://secure.gravatar.com/avatar/12d0c1e93574c7cb2c7a0bac96c7c1be?s=96&d=mm&r=g",
                        },
                      },
                    },
                    categories: {
                      edges: [
                        {
                          node: {
                            name: "Tips Jualan di Social media",
                            slug: "tips-jualan-di-social-media",
                          },
                        },
                      ],
                    },
                    tags: {
                      edges: [],
                    },
                  },
                },
                {
                  node: {
                    databaseId: 28549,
                    title: "Strategi untung jutaan dari TT shop",
                    excerpt:
                      "<p>Strategi Untung Jutaan dari TT Shop! Strategi untung jutaan dari TT shop &#8211; Tiktok bukan hanya menjadi ajang untuk mengadu kecantikan atau joget. Kini kamu bisa memanfaatkan TikTok Shop sebagai&#8230; </p>\n",
                    slug: "strategi-untung-jutaan-dari-tt-shop",
                    date: "2022-04-22T16:29:56",
                    featuredImage: {
                      node: {
                        sourceUrl:
                          "https://www.komunitasmea.web.id/wp-content/uploads/2022/04/business-plan-concept-illustration_114360-1487.webp",
                      },
                    },
                    author: {
                      node: {
                        slug: "fiqhi",
                        firstName: null,
                        lastName: null,
                        name: "fiqhi",
                        avatar: {
                          url: "https://secure.gravatar.com/avatar/12d0c1e93574c7cb2c7a0bac96c7c1be?s=96&d=mm&r=g",
                        },
                      },
                    },
                    categories: {
                      edges: [
                        {
                          node: {
                            name: "Tips Jualan di Social media",
                            slug: "tips-jualan-di-social-media",
                          },
                        },
                      ],
                    },
                    tags: {
                      edges: [],
                    },
                  },
                },
                {
                  node: {
                    databaseId: 28532,
                    title:
                      "Marketing Tools yang Wajib Diketahui Small Bussines",
                    excerpt:
                      "<p>Marketing Tools yang Wajib Diketahui Small Bussines Marketing tools yang wajib diketahui &#8211; Kenapa marketing tools penting untuk bisnis? Pastinya jualan menggunakan platform digital marketing tools untuk mendatangkan traffic ke&#8230; </p>\n",
                    slug: "marketing-tools-yang-wajib-diketahui-small-bussines",
                    date: "2022-04-22T16:19:28",
                    featuredImage: {
                      node: {
                        sourceUrl:
                          "https://www.komunitasmea.web.id/wp-content/uploads/2022/04/document-marketing-strategy-business-concept_53876-133729.webp",
                      },
                    },
                    author: {
                      node: {
                        slug: "fiqhi",
                        firstName: null,
                        lastName: null,
                        name: "fiqhi",
                        avatar: {
                          url: "https://secure.gravatar.com/avatar/12d0c1e93574c7cb2c7a0bac96c7c1be?s=96&d=mm&r=g",
                        },
                      },
                    },
                    categories: {
                      edges: [
                        {
                          node: {
                            name: "Cara Memulai Bisnis Online",
                            slug: "cara-memulai-bisnis-online",
                          },
                        },
                      ],
                    },
                    tags: {
                      edges: [],
                    },
                  },
                },
              ]}
            />
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
  const filterTypeMap = {
    category: "categoryName",
    tag: "tag",
    author: "authorName",
    search: "search"
  };

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
