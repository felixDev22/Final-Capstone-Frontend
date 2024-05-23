import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="no-hotels-container">
      <h2>Sorry</h2>
      <p>This page cannot be found</p>
      <Link to="/main">Back to the home page</Link>
    </div>
  );
}

export default NotFound;
