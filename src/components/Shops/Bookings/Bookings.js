import Booking from "./Booking.js";

import "./Bookings.css";

function Bookings({ services, shopId, bookigngModify }) {
  if (!services) {
    return (
      <div className="bookings">
        <h1>Service Backlog:</h1>
        <h3 className="item">No appointments yet</h3>
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
              {service.bookings.map((booking) => (
                <Booking
                  key={booking._id}
                  car={booking.car}
                  bookigngModify={bookigngModify}
                  bookingId={booking._id}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <h3 className="no-item item">No appointments yet</h3>
      )}
    </div>
  );
}

export default Bookings;
