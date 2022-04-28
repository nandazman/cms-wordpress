import { fetchBanner } from "../../lib/meaAPI";

export default async function getBanner(req, res) {
  const data = await fetchBanner();

  if (!data) {
    return res.status(401).json({ message: "Post not found" });
  }

  res.status(200).json(data);
}
