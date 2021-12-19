import eos from "../../static/img/404-3.jpeg";

import "./404.css";

function Error404() {
  return (
    <section className="view">
      <div className="container">
        <div className="no-page">
          <h1>404 This is not the service you are looking for.</h1>
          <img src={eos} alt="error 404" className="e404" />
        </div>
      </div>
    </section>
  );
}

export default Error404;
