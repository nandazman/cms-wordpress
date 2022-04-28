import axios from "axios";

const instance = axios.create({
  // withCredentials: true, for token
  headers: {
    "Content-Type": "application/json",
  },
});

async function fetchAPI(url, variables) {
  const res = await instance.post(`${url}`, variables);

  if (res.errors) {
    throw new Error("Failed to fetch API");
  }
  
  return res.data;
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

export function fetchBanner() {
  return fetchAPI("/api/banner");
}
