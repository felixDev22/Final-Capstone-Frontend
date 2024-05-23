import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addHotel, deleteHotel, clearAll } from '../../features/hotels';
import './Delete.css';
import rectangle from '../../Assets/rectangle.png';
import HotelList from '../HotelList/HotelList';

function Delete() {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.hotels);
  const hotelLength = useSelector((state) => state.hotels.hotels.length);
  useEffect(() => {
    dispatch(addHotel([]));

    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          'https://kefi-hotel-booking-app.onrender.com/api/v1/hotels',
        );
        dispatch(addHotel(response.data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchHotels();
  }, [dispatch]);

  const handleDelete = (id) => {
    axios
      .delete(`https://kefi-hotel-booking-app.onrender.com/api/v1/hotels/${id}`)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        dispatch(deleteHotel(id));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };
  const [user, setUser] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUser(user);
    }
  }, []);

  // const handleClearAll = () =>{
  //     dispatch(clearAll()); }

  return (
    <>
      {hotelLength < 1 && (
        <div className="no-hotels-container">
          <h1>
            Welcome
            {' '}
            {user.name}
          </h1>
          <p className="text-dark"> There are no hotels yet</p>
          <a href="/add-hotels" className=" btn btn-primary">
            Add Hotel
          </a>
        </div>
      )}

      {hotelLength > 0 && (
        <div className="delete-hotels">
          <div className="info">
            <img src={rectangle} alt="rectangle" />
            <p>Changed your mind yet? Delete some hotels</p>
          </div>
          <button className="btnssz" type="button" onClick={() => { dispatch(clearAll()); }}> Clear All </button>
          <HotelList hotels={hotels} onDelete={handleDelete} />
        </div>
      )}
    </>
  );
}

export default Delete;
