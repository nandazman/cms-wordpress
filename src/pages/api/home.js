import { getAllPostByPagination } from "../../lib/wordpressAPI";

export default async function preview(req, res) {
  const posts = await getAllPostByPagination(req.body);

  if (!posts) {
    return res.status(401).json({ message: "Post not found" });
  }

  res.status(200).json(posts);
}
