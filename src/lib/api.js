async function fetchAPI(url, variables) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(`${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(variables),
  });
  const json = await res.json();
  if (json.errors) {
    return json.errorsl
  }
  return json;
}

export function fetchPostForHome(variables) {
  return fetchAPI("/api/home", variables);
}

export function fetchPostAndMorePost() {
  return fetchAPI("/api/post-latest");
}

export function fetchPostByFilter(variables) {
  return fetchAPI("/api/post-by-filter", variables);
}

export function fetchPostForRecommendedCategory(variables) {
  return fetchAPI("/api/post-by-category", variables);
}

export function fetchCategories() {
  return fetchAPI("/api/categories");
}