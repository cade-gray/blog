import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="flex flex-col items-center">
          <p>Built using NextJS, Tailwind, and Markdown. Hosted on Vercel.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
