// Home page – shows a quick summary of key statistics
// -----------------------------------------------------------
// Added JSDoc, PropTypes, and clearer variable names for a more hand‑crafted feel.

import React from "react";
import PropTypes from "prop-types";

/**
 * Home component displays an overview of the system:
 *   • total number of doctors
 *   • how many are available today
 *   • how many appointments have already been booked
 *
 * @param {Object} props
 * @param {Array}  props.doctors – The full array of doctor objects.
 */
function Home({ doctors }) {
  // Total doctors in the dataset
  const totalDoctors = doctors.length;

  // Doctors that are available today and have at least one slot
  const availableToday = doctors.filter(
    (doc) => doc.isAvailableToday && doc.availableSlots > 0
  ).length;

  // Number of booked appointments
  const bookedCount = doctors.filter((doc) => doc.isBooked).length;

  return (
    <div>
      <h1>Welcome to Doctor Appointment</h1>
      <p>Find a doctor and book your appointment.</p>

      <div className="summary">
        <div className="card">
          <h2>{totalDoctors}</h2>
          <p>Total Doctors</p>
        </div>

        <div className="card">
          <h2>{availableToday}</h2>
          <p>Doctors Available Today</p>
        </div>

        <div className="card">
          <h2>{bookedCount}</h2>
          <p>Booked Appointments</p>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  doctors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Home;
