import { useEffect, useState } from "react";
import { endpoints } from "../../config/apiConfig.js";
import { get } from "../../services/apiService.js";

import ClickButton from "../UI/ClickButton.js";
import InfoCard from "../UI/InfoCard.js";
import Search from "./Search.js";

function Home() {
  const [searchMode, setSearchMode] = useState(false);
  const [bestShops, setBestShops] = useState([]); //initilally best shops -- afeter -- whatever the client searches for

  useEffect(() => {
    get(`${endpoints.shopApi}/shops/best`)
      .then((r) => {
        setBestShops(r);
      })
      .catch((e) => console.log(e));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const service = data.service.trim();

    if (/[^\w ]+/.test(service)) {
      console.log("Do not inject me");
      return;
    }

    get(`${endpoints.shopApi}/shops/best?service=${service}`)
      .then((r) => {
        // console.log(r);
        // setSearchMode(false);
        setBestShops(r);
      })
      .catch((e) => console.log(e));
  };

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
              <h1 className="Heading">Heading</h1>
              <p className="description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, quis laborum
                inventore repudiandae culpa nisi totam perspiciatis, vitae, quibusdam necessitatibus
                maiores vero iste unde ex asperiores distinctio tempora ipsam consequuntur.
              </p>
            </div>
          </div>
        </div>
        {searchMode ? (
          <Search onSubmit={onSubmit} />
        ) : (
          <ClickButton label="Book a Visit" onClick={() => setSearchMode(true)} />
        )}
        <section>
          {bestShops.length === 0 ? (
            <h3>No shops yet</h3>
          ) : (
            <div className="cards-container">
              {bestShops.map((c) => (
                <InfoCard key={c._id} item={c} />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default Home;
