import { getCategories } from "../../lib/wordpressAPI";

export default async function postyByCategory(req, res) {
  const data = await getCategories();

  if (!data) {
    return res.status(401).json({ message: "Post not found" });
  }

  res.status(200).json(data);
}
