import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../../config/apiConfig.js";
import { get } from "../../../services/apiService.js";

function BusinessProfile({ user }) {
  const [userShops, setUserShops] = useState([]);

  useEffect(() => {
    get(`${endpoints.shopApi}/${user.uid}`)
      .then((r) => {
        console.log(r);
        setUserShops(r);
      })
      .catch((e) => alert(e));
  }, [user.uid]);
  return (
    <section>
      <h1>Business</h1>
      <Link to="/shop/create">create shop</Link>
      <section>
        {userShops.length === 0 ? (
          <h3>No shops yet</h3>
        ) : (
          <>
            <h3>Your shops:</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specification</th>
                  <th>Services</th>
                  <th>details</th>
                </tr>
              </thead>
              <tbody>
                {userShops.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.specification}</td>
                    <td>{c.offeredServices.registered?.map((x) => x.name).join(", ")}</td>
                    <td>
                      <Link to={`/shop/${c._id}`}> Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </section>
  );
}

export default BusinessProfile;
