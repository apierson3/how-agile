import React from 'react';
import { Link } from 'react-router-dom';
import './Assessments.css'; // Make sure to create this CSS file for styling

const Assessments = () => {
  return (
    <div className="assessments-container">
      <div className="assessment-card">
        <h2>Davenport Maturity Model</h2>
        <Link to="/davenport">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
      <div className="assessment-card">
        <h2>Customer Experience Maturity Model</h2>
        <Link to="/cx">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Assessments;
