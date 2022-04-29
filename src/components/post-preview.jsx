import cn from "classnames";
import parse from "html-react-parser";
import Link from 'next/link';
import CoverImage from './cover-image';
import Date from './date';
import ChevronIcon from "./icons/chevron";
import style from "./post-preview.module.scss";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  categories,
  previewInArticle,
  row,
}) {
  const postAuthor = author.node;
  const name = postAuthor
    ? postAuthor.firstName && postAuthor.lastName
      ? `${postAuthor.firstName} ${postAuthor.lastName}`
      : postAuthor.name
    : null;

  if (previewInArticle) {
    return (
      <Link href={`/article/${slug}`}>
        <div className={cn(style.contentPreview, "cursor-pointer")}>
          <div className="mb-5">
            <CoverImage
              previewInArticle
              title={title}
              coverImage={coverImage}
              slug={slug}
              categories={categories}
            />
          </div>
          <div className={style.backdrop}></div>
          <div className={style.description}>
            <h3 className="text-3xl mb-3 leading-snug">{parse(title)}</h3>
            <div className="flex text-semi-normal">
              <p className="text-yellow mr-16px mb-0">
                <Date dateFormat="d	LLLL yyyy" dateString={date} />
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <div
      className={cn(
        { flex: row },
        { "gap-x-16px": row },
        { "items-center": row }
      )}
    >
      <div className={cn({ "mb-5": !row }, { "w-[330px]": row })}>
        <CoverImage
          margin={!row}
          previewInArticle={previewInArticle}
          title={title}
          coverImage={coverImage}
          slug={slug}
          categories={row ? null : categories}
        />
      </div>
      <div className={cn({ "w-96": row })}>
        <h3 className="text-3xl mb-3 leading-snug">
          <Link href={`/article/${slug}`}>
            <a
              className={cn(
                "hover:underline text-dark-blue font-medium mb-16px text-normal"
              )}
              dangerouslySetInnerHTML={{ __html: title }}
            ></a>
          </Link>
        </h3>
        <div className="flex flex-col">
          <div className={cn({ "order-2": row })}>
            <div
              className={cn(
                "leading-relaxed mb-16px text-dark-grey text-semi-normal",
                { "line-clamp-3": row },
                { "line-clamp-4": !row }
              )}
            >
              {parse(excerpt)}
            </div>
            <Link href={`/article/${slug}`}>
              <a className={cn("text-black text-normal block", { "mb-16px": !row })}>
                <span className="mr-16px text-semi-normal font-medium">
                  Baca Selengkapnya
                </span>{" "}
                <ChevronIcon />
              </a>
            </Link>
          </div>
          <div
            className={cn(
              "flex text-semi-normal",
              { "order-1": row },
              { "mb-20px": row }
            )}
          >
            <p className="text-dark-grey mr-16px mb-0">
              <Date dateString={date} />
            </p>
            <Link href={`/articles/author/${postAuthor.slug}`}>
              <a className="mb-0 text-dark-blue" aria-label={name}>
                By <span className="font-bold capitalize">{name}</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
