// DoctorCard – displays a single doctor's info and booking actions
// ---------------------------------------------------------------
// This component now includes PropTypes, clearer JSX layout, and inline
// comments explaining each conditional rendering block.

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Renders a card for a doctor with booking controls.
 * @param {Object} props
 * @param {Object} props.doctor – Doctor data object.
 * @param {Function} props.bookDoctor – Callback to book the doctor.
 * @param {Function} props.cancelDoctor – Callback to cancel a booking.
 */
function DoctorCard({ doctor, bookDoctor, cancelDoctor }) {
  const isFullyBooked = doctor.isBooked;
  const canBookToday = doctor.isAvailableToday && doctor.availableSlots > 0;

  return (
    <div className="card" style={{ padding: "1rem", margin: "0.5rem 0", border: "1px solid #ddd", borderRadius: "4px" }}>
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Fee: Rs. {doctor.fee}</p>
      <p>Rating: {doctor.rating}</p>

      {/* Availability status */}
      <p>{canBookToday ? "Available Today" : "Not Available"}</p>

      {/* Highlight senior doctors */}
      {doctor.experience >= 10 && <p>Senior Doctor</p>}

      <Link to={`/doctors/${doctor.id}`} style={{ marginRight: "1rem" }}>
        View Details
      </Link>

      {/* Booking / cancel controls */}
      <div style={{ marginTop: "0.5rem" }}>
        {isFullyBooked ? (
          <button onClick={() => cancelDoctor(doctor.id)}>Cancel Appointment</button>
        ) : !doctor.isAvailableToday ? (
          <p>Not Available Today</p>
        ) : doctor.availableSlots === 0 ? (
          <p>No Slots Left</p>
        ) : (
          <button onClick={() => bookDoctor(doctor.id)}>Book Appointment</button>
        )}
      </div>
    </div>
  );
}

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    fee: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    isAvailableToday: PropTypes.bool.isRequired,
    availableSlots: PropTypes.number.isRequired,
    isBooked: PropTypes.bool.isRequired,
  }).isRequired,
  bookDoctor: PropTypes.func.isRequired,
  cancelDoctor: PropTypes.func.isRequired,
};

export default DoctorCard;

