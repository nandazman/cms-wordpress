import Link from "next/link";
import style from "./tags.module.scss";

export default function Tags({ tags }) {
  return (
    <div>
      <p className={style.tags}>
        {tags.edges.map((tag, index) => (
          <Link key={index} href={`/articles/tag/${tag.node.slug}`}>
            <a className={style.item}>{tag.node.name}</a>
          </Link>
        ))}
      </p>
    </div>
  );
}
