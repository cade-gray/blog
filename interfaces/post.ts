type PostType = {
  slug: string;
  title: string;
  postDate: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export default PostType;
