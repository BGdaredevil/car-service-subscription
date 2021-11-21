import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../../config/apiConfig.js";
import { get } from "../../../services/apiService.js";

function PersonalProfile({ user }) {
  const [userCars, setUserCars] = useState([]);

  useEffect(() => {
    get(`${endpoints.carApi}/${user.uid}`)
      .then((r) => {
        console.log(r);
        setUserCars(r);
      })
      .catch((e) => alert(e));
  }, [user.uid]);

  return (
    <section>
      <h1>Personal</h1>
      <Link to="/car/create">create car</Link>
      <section>
        {userCars.length === 0 ? (
          <h3>No cars yet</h3>
        ) : (
          <>
            <h3>Your cars:</h3>
            <table>
              <thead>
                <tr>
                  <th>make</th>
                  <th>model</th>
                  <th>year</th>
                  <th>details</th>
                </tr>
              </thead>
              <tbody>
                {userCars.map((c) => (
                  <tr key={c._id}>
                    <td>{c.make}</td>
                    <td>{c.model}</td>
                    <td>{c.year}</td>
                    <td>
                      <Link to={`/car/${c._id}`}> Details</Link>
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

export default PersonalProfile;
