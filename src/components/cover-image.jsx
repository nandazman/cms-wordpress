import cn from "classnames";
import { useAmp } from "next/amp";
import Image from "next/image";
import Link from "next/link";
import Categories from "./categories";

export default function CoverImage({ title, coverImage, slug, categories, previewInArticle }) {
  const isAmp = useAmp();
  const image = (
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
  );

  return (
    <div className="mb-30px w-full">
      {slug ? (
        <div className="relative">
          <Link href={`/article/${slug}`}>
            <a aria-label={title}>{image}</a>
          </Link>
          {categories ? (
            <div
              className={cn(
                "absolute left-2",
                { "bottom-5": !previewInArticle },
                { "top-5": previewInArticle }
              )}
            >
              <Categories categories={categories} />
            </div>
          ) : (
            <></>
          )}
        </div>
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
