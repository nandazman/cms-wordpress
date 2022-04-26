import { useAmp } from "next/amp";
import Image from "next/image";
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
    <Link href={`/articles/author/${author.slug}`}>
      <a aria-label={name}>
        <div className="flex items-center py-5">
          <div className="w-20 h-20 relative mr-4">
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
          <div className="text-xl font-bold capitalize">{name}</div>
        </div>
      </a>
    </Link>
  );
}
