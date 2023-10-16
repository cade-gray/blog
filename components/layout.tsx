import Footer from "./footer";
import Meta from "./meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen bg-emerald-700">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
