// Main App component – sets up routing and state management
// ---------------------------------------------------------------
// Added comments, switched to react-router-dom, and used concise JSX.

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Browser routing
import initialDoctors from "./data/doctors";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import Appointments from "./pages/Appointments";

/**
 * Root component for the Doctor Appointment app.
 */
function App() {
  // Initialise doctors with an extra `isBooked` flag.
  const [doctors, setDoctors] = useState(
    initialDoctors.map((doctor) => ({ ...doctor, isBooked: false }))
  );

  // Book a doctor if they are available today and have slots left.
  function bookDoctor(id) {
    const updated = doctors.map((doc) => {
      if (doc.id === id && doc.isAvailableToday && doc.availableSlots > 0) {
        return { ...doc, isBooked: true, availableSlots: doc.availableSlots - 1 };
      }
      return doc;
    });
    setDoctors(updated);
  }

  // Cancel a booking and restore a slot.
  function cancelDoctor(id) {
    const updated = doctors.map((doc) => {
      if (doc.id === id && doc.isBooked) {
        return { ...doc, isBooked: false, availableSlots: doc.availableSlots + 1 };
      }
      return doc;
    });
    setDoctors(updated);
  }

  const bookedCount = doctors.filter((d) => d.isBooked).length;

  return (
    <div>
      <Navbar bookedCount={bookedCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home doctors={doctors} />} />
          <Route
            path="/doctors"
            element={<Doctors doctors={doctors} bookDoctor={bookDoctor} cancelDoctor={cancelDoctor} />}
          />
          <Route
            path="/doctors/:id"
            element={<DoctorDetails doctors={doctors} bookDoctor={bookDoctor} cancelDoctor={cancelDoctor} />}
          />
          <Route
            path="/appointments"
            element={<Appointments doctors={doctors} cancelDoctor={cancelDoctor} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
