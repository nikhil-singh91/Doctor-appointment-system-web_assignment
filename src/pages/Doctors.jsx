// Doctors page – lists doctors with a specialization filter
// ------------------------------------------------------------
// Added comments, PropTypes and clearer markup to give the code a more
// hand‑crafted feel.

import React, { useState } from "react";
import PropTypes from "prop-types";
import DoctorCard from "../components/DoctorCard";

/**
 * Displays a list of doctors with optional specialization filtering.
 * @param {Object} props
 * @param {Array} props.doctors – Array of doctor objects.
 * @param {Function} props.bookDoctor – Callback to book a doctor.
 * @param {Function} props.cancelDoctor – Callback to cancel a booking.
 */
function Doctors({ doctors, bookDoctor, cancelDoctor }) {
  const [specialization, setSpecialization] = useState("All");

  // Filter doctors based on the selected specialization
  const filteredDoctors = doctors.filter((doctor) => {
    if (specialization === "All") return true;
    return doctor.specialization === specialization;
  });

  return (
    <div>
      <h1>All Doctors</h1>

      <label htmlFor="spec-select">Filter by specialization: </label>
      <select
        id="spec-select"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        style={{ marginLeft: "0.5rem" }}
      >
        <option>All</option>
        <option>Cardiologist</option>
        <option>Dermatologist</option>
        <option>Orthopedic</option>
        <option>Pediatrician</option>
        <option>Dentist</option>
      </select>

      <div className="grid" style={{ marginTop: "1rem" }}>
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            bookDoctor={bookDoctor}
            cancelDoctor={cancelDoctor}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 && <p>No doctors found.</p>}
    </div>
  );
}

Doctors.propTypes = {
  doctors: PropTypes.arrayOf(PropTypes.object).isRequired,
  bookDoctor: PropTypes.func.isRequired,
  cancelDoctor: PropTypes.func.isRequired,
};

export default Doctors;
