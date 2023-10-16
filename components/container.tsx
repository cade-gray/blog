type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-5 p-1">{children}</div>;
};

export default Container;
