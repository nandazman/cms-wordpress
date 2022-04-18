import Link from "next/link";

export default function Tags({ tags }) {
  console.log({ tags });
  return (
    <div className="max-w-2xl mx-auto">
      <p className="mt-8 text-lg font-bold">
        Tagged
        {tags.edges.map((tag, index) => (
          <Link
            key={index}
            href={`/posts/tag/${tag.node.slug}`}
            >
            <a
              className="ml-4 font-normal"
            >
              {tag.node.name}
            </a>
          </Link>
        ))}
      </p>
    </div>
  );
}
