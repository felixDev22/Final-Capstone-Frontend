import React from "react";
import PropTypes from "prop-types";

function HotelItem({ hotel, onDelete }) {
  return (
    <div className="hotelItems">
      <img src={hotel.photo} alt={hotel.name} />
      <div className="hotelDetails">
        <h3 className="hotelName">{hotel.name}</h3>
      </div>
      <button
        className="btnssz"
        type="button"
        onClick={() => onDelete(hotel.id)}
      >
        Delete
      </button>
    </div>
  );
}

HotelItem.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HotelItem;
