import { CMS_NAME } from "../lib/constants";

const Intro = () => {
  return (
    <section className="flex-col flex items-center mb-16 md:mb-12">
      <img src="/assets/header/CG.svg" alt="" width="200px" height="200px" />
      <h1 className="text-xl text-gray-200 md:text-5xl font-bold tracking-tighter leading-tight">
        Cade Gray Dev Blog
      </h1>
    </section>
  );
};

export default Intro;
