import cn from "classnames";
import { useAmp } from "next/amp";
import Image from "next/image";
import Link from "next/link";
import Categories from "./categories";

export default function CoverImage({ title, coverImage, slug, categories }) {
  const isAmp = useAmp();
  const image = (
    <div className="relative">
      <Image
        alt={`Cover Image for ${title}`}
        src={
          coverImage?.node?.sourceUrl ||
          "https://storage.googleapis.com/smarketing-prod/course-thumbnail/Yohan Agustian.png"
        }
        className={cn("shadow-small", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
        width={678}
        height={414}
        layout="responsive"
      />
      {categories ? (
        <div className="absolute bottom-5 left-2">
          <Categories categories={categories} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <div className="mb-30px w-full">
      {slug ? (
        <Link href={`/article/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        <>
          {isAmp ? (
            <amp-img
              width={678}
              height={414}
              src={coverImage?.node?.sourceUrl}
              layout="responsive"
            />
          ) : (
            image
          )}
        </>
      )}
    </div>
  );
}
