import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL_MEA}/api`;

const instance = axios.create({
  // withCredentials: true, for token
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function fetchAPI(url) {
  const res = await instance.get(`${url}`);

  if (res.errors) {
    throw new Error("Failed to fetch API");
  }

  return res.data;
}

export function fetchBanner() {
  return fetchAPI("/banner?show_screen=1,2");
}
