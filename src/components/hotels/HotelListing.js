/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Hotel from "../hotel/hotel";
import rightarr from "../../Assets/rightarr.png";
import leftarr from "../../Assets/leftarr.png";
import "./hotellisting.css";
import "../Delete/Delete.css";

export default function HotelListing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hotels = useSelector((state) => state.hotels.hotels);
  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % hotels.length);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? hotels.length - 1 : currentIndex - 1);
  };
  const numVisibleHotels = window.innerWidth < 768 ? 1 : 3;

  return (
    <div className="deleted">
      <img
        src={leftarr}
        className="leftarr"
        alt="left arrow"
        onClick={handlePrev}
      />
      <div className="hotelList">
        {hotels.length > 0 &&
          hotels
            .slice(currentIndex, currentIndex + numVisibleHotels)
            .map((hotel) => <Hotel hotel={hotel} key={hotel.id} />)}
      </div>
      <img
        src={rightarr}
        className="rightarr"
        alt="right arrow"
        onClick={handleNext}
      />
    </div>
  );
}
