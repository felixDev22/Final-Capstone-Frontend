import React from 'react';
import { NavLink } from 'react-router-dom';
import conference from '../../Assets/conference.png';
import reception from '../../Assets/reception.png';
import spa from '../../Assets/spa.png';
import room1 from '../../Assets/room1.png';
import dinning from '../../Assets/dining.png';
import play from '../../Assets/play.png';
import './services.css';

export default function Services() {
  return (
    <div className="service-wrapper">
      <div className="grid-container">
        <NavLink to="/main">
          <div className="pic-wrapper">
            <div className="box">
              <img src={conference} alt="pic1" className="service-pic" />
            </div>
            <div className="box2">
              <h6>Hospitality</h6>
              <img src={play} alt="pic1" className="service-icon" />
            </div>
            <div className="box">
              <img src={reception} alt="pic1" className="service-pic" />
            </div>
            <div className="box2">
              <h6>Conference</h6>
              <img src={play} alt="pic1" className="service-icon" />
            </div>
            <div className="box">
              <img src={room1} alt="pic1" className="service-pic" />
            </div>
            <div className="box3">
              <h6>Dining</h6>
              <img src={play} alt="pic1" className="service-icon" />
            </div>
            <div className="box">
              <img src={spa} alt="pic1" className="service-pic" />
            </div>
            <div className="box3">
              <h6>Spa</h6>
              <img src={play} alt="pic1" className="service-icon" />
            </div>
            <div className="box">
              <img src={dinning} alt="pic1" className="service-pic" />
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
