import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  postDate: string;
  lastUpdated: string;
};

const PostHeader = ({ title, coverImage, postDate, lastUpdated }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <b>Posted: </b>
          <DateFormatter dateString={postDate} />
        </div>
        <div className="mb-6 text-lg">
          <b>Last Updated: </b>
          <DateFormatter dateString={lastUpdated} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
