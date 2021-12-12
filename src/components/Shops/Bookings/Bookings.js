import ClickButton from "../../UI/ClickButton.js";

function Bookings({ services }) {
  console.log(services);
  // if (!services) {
  //   return null;
  // }

  const withBookings = services.filter((x) => x.bookings.length > 0);

  return (
    <div className="bookings">
      {withBookings.length > 0 ? (
        withBookings.map((service) => (
          <div className="item">
            <h1>{service.name}</h1>
            {service.bookings.map((car) => (
              <div className="bookedCar">
                <h3>
                  {car.make} {car.model} {car.year}
                </h3>
                <ClickButton label="accept" />
                <ClickButton label="reject" />
              </div>
            ))}
          </div>
        ))
      ) : (
        <h3>No pending bookings</h3>
      )}
    </div>
  );
}

export default Bookings;
