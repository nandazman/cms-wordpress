import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

export default function CoverImage({ title, coverImage, slug }) {
  if (!coverImage) return <></>;

  const image = (
    <Image
      alt={`Cover Image for ${title}`}
      src={coverImage?.node?.sourceUrl}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      width={678}
      height={414}
      layout="responsive"
    />
  );
  return (
    <div className="sm:mx-0 mb-5" style={{ maxWidth: "672px", width: "100%" }}>
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
