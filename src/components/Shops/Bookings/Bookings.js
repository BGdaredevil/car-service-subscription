import ClickButton from "../../UI/ClickButton.js";

import "./Bookings.css";

function Bookings({ services }) {
  console.log(services);
  if (!services) {
    return (
      <div className="bookings">
        <h1>No appointments yet</h1>
      </div>
    );
  }

  const withBookings = services.filter((x) => x.bookings.length > 0);

  return (
    <div className="bookings">
      <h1>Service Backlog:</h1>
      {withBookings.length > 0 ? (
        withBookings.map((service) => (
          <div key={service._id} className="item">
            <h1>{service.name}</h1>
            <div className="cars-waiting-service">
              {service.bookings.map((car) => (
                <div key={car._id} className="bookedCar">
                  <h3>
                    {car.make} {car.model} {car.year}
                  </h3>
                  <ClickButton label="accept" />
                  <ClickButton label="reject" />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h3 className="item">No appointments yet</h3>
      )}
    </div>
  );
}

export default Bookings;
