// Appointments page – lists all booked doctors and total fee
// ---------------------------------------------------------------
// Added PropTypes and more descriptive markup.

import React from "react";
import PropTypes from "prop-types";
import DoctorCard from "../components/DoctorCard";

/**
 * Shows all doctors that have been booked and the total consultation fee.
 * @param {Object} props
 * @param {Array} props.doctors – Full doctor list.
 * @param {Function} props.cancelDoctor – Callback to cancel a booking.
 */
function Appointments({ doctors, cancelDoctor }) {
  const bookedDoctors = doctors.filter((doctor) => doctor.isBooked);

  const totalFee = bookedDoctors.reduce((total, doctor) => total + doctor.fee, 0);

  return (
    <div>
      <h1>My Appointments</h1>

      {bookedDoctors.length === 0 ? (
        <p>No appointments booked</p>
      ) : (
        <div>
          <h3>Total Consultation Fee: Rs. {totalFee}</h3>

          <div className="grid" style={{ marginTop: "1rem" }}>
            {bookedDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                cancelDoctor={cancelDoctor}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Appointments.propTypes = {
  doctors: PropTypes.arrayOf(PropTypes.object).isRequired,
  cancelDoctor: PropTypes.func.isRequired,
};

export default Appointments;

