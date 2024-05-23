import React from 'react';
import { NavLink } from 'react-router-dom';
import './splach.css';
import logo from '../../Assets/KefI-logo-green.png';

export default function Splash() {
  return (
    <div className="wrapper">
      <div className="splash">
        <img src={logo} alt="logo" />
        <h1>WELCOME</h1>
      </div>
      <div className="btns">
        <NavLink
          to="/login"
          className="btn login btn-primary btn-rounded mx-5 px-5"
          activeClassName="active"
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className="btn signup btn-primary btn-rounded mx-5 px-5"
          activeClassName="active"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
}
