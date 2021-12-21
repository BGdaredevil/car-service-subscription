import { useEffect, useState } from "react";
import { endpoints } from "../../config/apiConfig.js";
import { get } from "../../services/apiService.js";

import ClickButton from "../UI/ClickButton.js";
import InfoCard from "../UI/InfoCard.js";
import Search from "./Search.js";

import "./Home.css";

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

  const hide = () => setSearchMode(false);

  return (
    <section className="view">
      <div className="container">
        <div className="ad">
          <h1>Need some service to be done?</h1>
          <h3>Look no further as our best profesionals are one click away!</h3>
          {searchMode ? (
            <Search onSubmit={onSubmit} hide={hide} />
          ) : (
            <div className="search">
              <ClickButton label="Book a Visit" onClick={() => setSearchMode(true)} />
            </div>
          )}
          {bestShops.length === 0 ? (
            <h1>No shops yet</h1>
          ) : (
            <h1>Our clients recomend the folowing businesses:</h1>
          )}
        </div>
        <div className="best-shops">
          <section className="homeCarusell">
            {bestShops.length === 0 ? (
              <h1>No shops yet</h1>
            ) : (
              <div className="cards-container">
                {bestShops.map((c) => (
                  <InfoCard key={c._id} item={c} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

export default Home;
