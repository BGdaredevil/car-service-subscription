import { faInbox, faMapMarkedAlt, faPhoneAlt, faSleigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";
import { Link } from "react-router-dom";

library.add(fab);

function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="logoSection">
          <Link to="/">
            <FontAwesomeIcon icon={faSleigh} size="3x" className="logo" />
          </Link>
          <h3>Flreelance Designs Inc.</h3>
        </div>
        <div className="infoSection">
          <section className="footer-data">
            <FontAwesomeIcon icon={faMapMarkedAlt} size="2x" />
            <p>Address:</p>
            <p>Stara Zagora</p>
            <FontAwesomeIcon icon={faPhoneAlt} size="2x" />
            <p>Phone:</p>
            <p>0555 55 55 55</p>
            <FontAwesomeIcon icon={faInbox} size="2x" />
            <p>email:</p>
            <p>dimityr.dimitr0v@abv.bg</p>
          </section>
          <section className="footer-icons">
            <a href="https://www.facebook.com/">
              <FontAwesomeIcon icon={["fab", "facebook-square"]} size="2x" />
            </a>
            <a href="https://www.instagram.com/">
              <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/dimityr-dimitrov-6b2418128/">
              <FontAwesomeIcon icon={["fab", "linkedin"]} size="2x" />
            </a>
            <a href="https://github.com/BGdaredevil">
              <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
            </a>
          </section>
        </div>
        <div className="aboutSection">
          <h4>About:</h4>
          <p>
            A simple react application implementing the MERN stack. All written by Dimitar Dimitrov
            as a personal assignment for the SoftUni React course.
          </p>
          <p> &copy;DD 2021</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
