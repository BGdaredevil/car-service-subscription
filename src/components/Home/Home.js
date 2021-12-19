import { Link } from "react-router-dom";
import { useState } from "react";

import ClickButton from "../UI/ClickButton.js";
import Search from "./Search.js";

function Home() {
  const [searchMode, setSearchMode] = useState(false);

  return (
    <section className="view">
      <div className="container">
        <div className="ad">
          <div className="left">
            <h1> Need some work to be done ?</h1>
            <ClickButton label="we offer the best options" />
          </div>
          <div className="right">
            <h1>Looking for good business?</h1>
            <ClickButton label="We can hook you up with clients" />
          </div>
        </div>
        <div className="best-shops">
          <div className="card">
            <div className="">
              <h1 className="Hheading">Heading</h1>
              <p className="description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, quis laborum
                inventore repudiandae culpa nisi totam perspiciatis, vitae, quibusdam necessitatibus
                maiores vero iste unde ex asperiores distinctio tempora ipsam consequuntur.
              </p>
              {/* <Link to="/service/search"> */}

              {searchMode ? (
                <Search />
              ) : (
                <ClickButton label="Book a Visit" onClick={() => setSearchMode(true)} />
              )}
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
