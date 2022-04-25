import Date from './date';
import PostHeaderShare from './post-share';
import PostTitle from './post-title';

export default function PostHeader({ title, date, link }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="lg:mb-24px mb-20px">
        <Date dateString={date} dateFormat="d	LLLL, yyyy" />
      </div>
      <div>
        <PostHeaderShare link={link} title={title} />
      </div>
    </>
  );
}
