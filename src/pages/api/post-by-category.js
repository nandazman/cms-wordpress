import { getPostByCategory } from "../../lib/wordpressAPI";

export default async function postyByCategory(req, res) {
  const posts = await getPostByCategory(req.body.category, req.body.currentId);

  if (!posts) {
    return res.status(401).json({ message: "Post not found" });
  }

  res.status(200).json(posts);
}
