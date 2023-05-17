// src/components/Delete.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addHotel, deleteHotel } from '../../features/hotels';
import './Delete.css';
import rectangle from '../../Assets/rectangle.png';
import HotelList from '../HotelList/HotelList';

const Delete = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels);
  console.log(hotels);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(addHotel([]));

    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/hotels');
        dispatch(addHotel(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/hotels/${id}`)
      .then((response) => {
        console.log(response);
        dispatch(deleteHotel(id));
      })
      .catch((error) => console.error(error));
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % hotels.length);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? hotels.length - 1 : currentIndex - 1);
  };

  return (
    <div className="delete-hotels">
      <div className="info">
        <img src={rectangle} alt="rectangle" />
        <p>Changed your mind yet? Delete some hotels</p>
      </div>
      <HotelList
        hotels={hotels}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
        onDelete={handleDelete}
      />
      <button
        onClick={() => (window.location.href = '/reserve')}
        className="reservebtn"
      >
        Reserve
      </button>
    </div>
  );
};

export default Delete;