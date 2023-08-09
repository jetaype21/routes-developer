import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear().toLocaleString();

  return (
    <footer className="container__footer">
      <section className="container__footer--section">
        {/* logo */}
        <Link to={"/"}>
          <h1 className={"logo"}>Dev Map</h1>
        </Link>

        {/* links */}
        <section>
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>About</Link>
          <Link to={"/"}>Contact</Link>
        </section>
      </section>

      <p className="text__copyright">
        © {year} Dev Map - Juan Taype. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
