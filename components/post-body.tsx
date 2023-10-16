import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto bg-slate-50">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <p>Written by Cade Gray</p>
    </div>
  );
};

export default PostBody;
