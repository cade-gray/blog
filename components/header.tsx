import Link from "next/link";

const Header = () => {
  return (
    <Link href="/" className="hover:underline">
      <img
        src="/assets/header/CG.svg"
        alt="Cade Gray Dev Blog"
        width="100px"
        height="100px"
      />
    </Link>
  );
};

export default Header;
