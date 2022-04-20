import { getAllPostsForHome } from "../../lib/wordpressAPI";

export default async function preview(req, res) {
  const posts = await getAllPostsForHome(req.body);

  if (!posts) {
    return res.status(401).json({ message: "Post not found" });
  }

  res.status(200).json(posts);
}
