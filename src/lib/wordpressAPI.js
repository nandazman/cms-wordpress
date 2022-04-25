const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()
  if (json.errors) {
    console.log(json.errors);
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllPostByPagination(variables) {
  const filter = variables.filter
    ? `, ${variables.filterType}: "${variables.filter}"`
    : "";
  const data = await fetchAPI(
    `
    query AllPosts($first: Int
    $last: Int
    $after: String
    $before: String) {
      posts(first: $first, last: $last, after: $after, before: $before, where: {orderby: {field: DATE, order: DESC} ${filter}}) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              edges {
                node {
                  name
                  id
                  slug
                }
              }
            }
            author {
              node {
                slug
                id
                nickname
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables,
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview?.id
    : slug === postPreview?.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      databaseId
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          slug
          firstName
          lastName
          name
          avatar {
            url
          }
        }
      }
      categories {
        edges {
          node {
            name
            slug
          }
        }
      }
      tags {
        edges {
          node {
            slug
            name
          }
        }
      }
    }

    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
            revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
              edges {
                node {
                  title
                  excerpt
                  content
                  author {
                    ...AuthorFields
                  }
                }
              }
            }
            `
            : ""
        }
      }
      posts(first: 4, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 4 posts, remove the last one
  if (data.posts.edges.length > 3) data.posts.edges.pop()

  return data
}

export async function getPostByCategory(category, currentId) {
  const data = await fetchAPI(
    `
    query PosyByCategory {
      posts(first: 6, where: {orderby: {field: DATE, order: DESC}, categoryName: "${category}", notIn: ${currentId} }) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `
  );

  return data?.posts;
} 

export async function getCategories() {
  const data = await fetchAPI(
    `
    query Categories {
      categories {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `
  );

  return data?.categories?.edges || [];
  
}