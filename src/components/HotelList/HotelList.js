import React from 'react';
import PropTypes from 'prop-types';
import HotelItem from '../HotelItem/HotelItem';

function HotelList({ hotels, onDelete }) {
  return (
    <div className="deletes">
      <div className="hotelLists">
        {hotels.map((hotel) => (
          <HotelItem key={hotel.id} hotel={hotel} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

HotelList.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HotelList;
