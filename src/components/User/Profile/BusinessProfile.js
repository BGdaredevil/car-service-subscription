import { Link } from "react-router-dom";

function BusinessProfile() {
  return (
    <section>
      <h1>Business</h1>
      <Link to="/shop/create">create shop</Link>
    </section>
  );
}

export default BusinessProfile;
