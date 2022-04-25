import cn from "classnames";
import { useAmp } from "next/amp";
import Image from "next/image";
import Link from "next/link";
import Categories from "./categories";

export default function CoverImage({
  title,
  coverImage,
  slug,
  categories,
  previewInArticle,
  margin,
}) {
  const isAmp = useAmp();

  const isCategoriesContain = (type) => {
    if (categories?.edges?.length > 0) {
      const contain = categories.edges.find((category) => {
        category.node.name.includes(type);
      });
      
      return !!contain;
    }
    return false
  }

  const getThumbnail = () => {
    const loweredTitle = title.toLowerCase();
    if (loweredTitle.includes("shopee") || isCategoriesContain("shopee"))
      return "/asset/shopee.png";
    
    if (loweredTitle.includes("tiktok") || isCategoriesContain("tiktok"))
      return "/asset/tiktok.jpeg";
    
    if (
      loweredTitle.includes("marketplace") ||
      isCategoriesContain("marketplace")
    )
      return "/asset/marketplace.png";
    if (
      loweredTitle.includes("penjualan") ||
      loweredTitle.includes("tips") ||
      loweredTitle.includes("shop") ||
      isCategoriesContain("penjualan") ||
      isCategoriesContain("tips") ||
      isCategoriesContain("shop")
    )
      return "/asset/online-selling.png";
    
    if (
      loweredTitle.includes("social") ||
      loweredTitle.includes("sosial") ||
      loweredTitle.includes("media") ||
      isCategoriesContain("social") || 
      isCategoriesContain("sosial") ||
      isCategoriesContain("media")
    )
      return "/asset/social-media.png";
    return "/asset/general.jpg";
  }
  const image = (
    <Image
      alt={`Cover Image for ${title}`}
      src={
        coverImage?.node?.sourceUrl ||
        getThumbnail()
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
    <div className={cn("w-full", { "mb-30px": margin })}>
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
                { "top-5": previewInArticle },
                "z-10"
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
