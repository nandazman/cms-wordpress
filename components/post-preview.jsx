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
}) {
  const postAuthor = author.node;
  const name = postAuthor
    ? postAuthor.firstName && postAuthor.lastName
      ? `${postAuthor.firstName} ${postAuthor.lastName}`
      : postAuthor.name
    : null;
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          title={title}
          coverImage={coverImage}
          slug={slug}
          categories={categories}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/article/${slug}`}>
          <a
            className="hover:underline text-dark-blue text-normal font-bold mb-16px"
            dangerouslySetInnerHTML={{ __html: title }}
          ></a>
        </Link>
      </h3>
      <div
        className={`text-normal leading-relaxed mb-16px text-dark-grey text-semi-normal ${style.content}`}
      >
        {parse(excerpt)}
      </div>
      <Link href={`/article/${slug}`}>
        <a className="text-black text-normal block mb-16px">
          <span className="mr-16px text-semi-normal">Baca Selengkapnya</span>{" "}
          <ChevronIcon />
        </a>
      </Link>
      <div className="flex text-semi-normal">
        <p className="text-dark-grey mr-16px mb-0">
          <Date dateString={date} />
        </p>
        <Link href={`/articles/author/${postAuthor.slug}`}>
          <a className="mb-0 text-dark-blue" aria-label={name}>
            By <span className="font-bold">{name}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
