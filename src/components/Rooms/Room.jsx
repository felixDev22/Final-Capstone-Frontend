import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { addRooms } from '../../features/room';
import rectangle from '../../Assets/rectangle.png';
import './Room.css';
import back from '../../Assets/back.png';

function Room() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);

  const url = useParams();
  const hotelId = url.hotel_id;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(addRooms([]));

    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `https://kefi-hotel-booking-app.onrender.com/api/v1/hotels/${hotelId}/rooms`,
        );
        dispatch(addRooms(response.data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === rooms.length - 1 ? 0 : prevSlide + 1));
    }, 3000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [rooms.length]);

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="roomsz">
      <div className="infozz">
        <img src={rectangle} alt="rectangle" />
        <p>Get a Glimpse of the Rooms</p>
      </div>

      <div className="slideshowz">
        {rooms.map((room, index) => {
          // eslint-disable-next-line no-nested-ternary
          const slideClass = index === currentSlide
            ? 'room aactive'
            : index === currentSlide - 1
                || (currentSlide === 0 && index === rooms.length - 1)
              ? 'room previous'
              : 'room next';

          return (
            <div className={slideClass} key={room.id}>
              <div className="imaage">
                <img src={room.photo} alt="Room" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="ddot">
        <div className="arrowz">
          <Link to={`/hotel/${hotelId}/reserve`}>
            <img src={back} alt="left arrow" />
          </Link>
        </div>
        <div className="dotsz">
          {rooms.map((_, index) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`dot ${index === currentSlide ? 'aactive' : ''}`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Room;
