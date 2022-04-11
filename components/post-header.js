import Avatar from '../components/avatar'
import Categories from '../components/categories'
import CoverImage from '../components/cover-image'
import Date from '../components/date'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, author, categories, isAmp }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar author={author} isAmp={isAmp} />
      </div>
      <div className="max-w-2xl mx-auto">
        <CoverImage title={title} coverImage={coverImage} isAmp={isAmp} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar author={author} isAmp={isAmp} />
        </div>
        <div className="mb-6 text-lg">
          Posted <Date dateString={date} />
          <Categories categories={categories} />
        </div>
      </div>
    </>
  );
}
