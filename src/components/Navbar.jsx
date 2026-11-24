// Navbar component – displays navigation links and the number of booked appointments
// ---------------------------------------------------------------
// This component now includes a small PropTypes definition and a brief comment
// explaining its purpose. It also uses a more readable JSX layout.

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Navigation bar for the Doctor Appointment app.
 * @param {Object} props
 * @param {number} props.bookedCount – How many appointments are currently booked.
 */
function Navbar({ bookedCount }) {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h2 style={{ margin: 0 }}>Doctor Appointment</h2>
      <div style={{ marginTop: "0.5rem" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/doctors" style={{ marginRight: "1rem" }}>
          Doctors
        </Link>
        <Link to="/appointments">
          Appointments ({bookedCount})
        </Link>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  bookedCount: PropTypes.number.isRequired,
};

export default Navbar;
