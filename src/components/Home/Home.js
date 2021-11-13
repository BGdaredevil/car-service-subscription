import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import ClickButton from "../UI/ClickButton.js";

function Home() {
  const { user } = useContext(AuthContext);
  console.log(`email: ${user.email}\ndisplayName ${user.displayName}`);
  return (
    <>
      <div className="ad">
        <div className="left">
          <h1> Ned some work to be done ?</h1>
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, quis laborum inventore
              repudiandae culpa nisi totam perspiciatis, vitae, quibusdam necessitatibus maiores
              vero iste unde ex asperiores distinctio tempora ipsam consequuntur.
            </p>
            <ClickButton label="Book a Visit" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
