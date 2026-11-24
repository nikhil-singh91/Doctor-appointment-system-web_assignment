// DoctorDetails – shows detailed info for a selected doctor
// -----------------------------------------------------------
// Uses only useState and useEffect (no useParams). The doctor id is extracted
// from the URL via plain JavaScript.

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Detailed view of a doctor with booking controls.
 * @param {Object} props
 * @param {Array}  props.doctors – List of doctors.
 * @param {Function} props.bookDoctor – Function to book a doctor.
 * @param {Function} props.cancelDoctor – Function to cancel a booking.
 */
function DoctorDetails({ doctors, bookDoctor, cancelDoctor }) {
  // Store the doctor id parsed from the URL (e.g. "/doctors/3" → 3).
  const [doctorId, setDoctorId] = useState(null);

  // Run once on component mount.
  useEffect(() => {
    const idString = window.location.pathname.split("/").pop();
    const idNum = Number(idString);
    if (!isNaN(idNum)) {
      setDoctorId(idNum);
    }
  }, []);

  // Find the doctor once we have an id.
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <div>
        <h2>Doctor not found</h2>
        <Link to="/doctors">Back to Doctors</Link>
      </div>
    );
  }

  const isFullyBooked = doctor.isBooked;
  const canBookToday = doctor.isAvailableToday && doctor.availableSlots > 0;

  return (
    <div className="card" style={{ padding: "1rem", margin: "1rem 0" }}>
      <h1>{doctor.name}</h1>
      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Fee: Rs. {doctor.fee}</p>
      <p>Rating: {doctor.rating}</p>
      <p>Hospital: {doctor.hospital}</p>
      <p>Available Slots: {doctor.availableSlots}</p>

      {/* Booking controls */}
      {isFullyBooked ? (
        <button onClick={() => cancelDoctor(doctor.id)}>Cancel Appointment</button>
      ) : !doctor.isAvailableToday ? (
        <p>Not Available Today</p>
      ) : doctor.availableSlots === 0 ? (
        <p>No Slots Left</p>
      ) : (
        <button onClick={() => bookDoctor(doctor.id)}>Book Appointment</button>
      )}

      <p>
        <Link to="/doctors">Back to Doctors</Link>
      </p>
    </div>
  );
}

DoctorDetails.propTypes = {
  doctors: PropTypes.arrayOf(PropTypes.object).isRequired,
  bookDoctor: PropTypes.func.isRequired,
  cancelDoctor: PropTypes.func.isRequired,
};

export default DoctorDetails;
