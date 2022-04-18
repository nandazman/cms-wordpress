import { useAmp } from "next/amp";
import Image from 'next/image';
import Link from "next/link";

export default function Avatar(data) {
  const isAmp = useAmp();
  const author = data.author.node;
  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name
    : null;


  if (isAmp) return <></>;
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        {author.avatar.url ? (
          <>
            <Image
              src={author.avatar.url}
              layout="fill"
              className="rounded-full"
              alt={name}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="text-xl font-bold">
        <Link href={`/posts/author/${author.slug}`}>
          <a aria-label={name}>{name}</a>
        </Link>
      </div>
    </div>
  );
}
