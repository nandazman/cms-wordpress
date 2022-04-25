async function fetchAPI(url, variables) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(`${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(variables),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error("Failed to fetch API");
  }
  return json;
}

export function fetchPostForHome(variables) {
  return fetchAPI("/api/home", variables);
}

export function fetchPostForRecommendedCategory(variables) {
  return fetchAPI("/api/post-by-category", variables);
}