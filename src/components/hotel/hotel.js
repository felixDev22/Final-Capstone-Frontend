import React from 'react';
import PropTypes from 'prop-types';
import './hotel.css';
import { Link } from 'react-router-dom';
import vec from '../../Assets/vec.png';

export default function Hotel({ hotel }) {
  const maxDescLength = 115;
  const truncatedDesc = hotel.desc.length > maxDescLength
    ? `${hotel.desc.slice(0, maxDescLength)}...`
    : hotel.desc;

  return (
    <div className="card">
      <img src={hotel.photo} className="card-img-top" alt={hotel.name} />
      <div className="card-body">
        <h5 className="card-title cardtitle">{hotel.name}</h5>
        <img src={vec} alt="Mombassa" />
        <ul className="rating">
          <li>
            <i className="fa fa-star" aria-hidden="true" />
            {hotel.rating}
          </li>
          <li>
            <i className="fa fa-circle" aria-hidden="true" />
          </li>
          <li>
            <i className="fas fa-map-marker-alt" />
            {hotel.location}
          </li>
        </ul>
        <div className="price">
          <p>
            Price:
            {' '}
            <span>
              $
              {hotel.price}
            </span>
          </p>
        </div>
        <p className="card-text">
          {' '}
          {truncatedDesc}
        </p>
        <Link
          to={{
            pathname: `/hotel/${hotel.id}/reserve`,
            state: {
              hotel,
            },
          }}
          className="btn btn-primary"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

Hotel.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
