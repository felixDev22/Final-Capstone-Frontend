import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hotelsApi from '../../common/apis/hotels';
import './Main.css';
import Hotels from '../hotels/HotelListing';
import { addHotel } from '../../features/hotels';

export default function Main() {
  const dispatch = useDispatch();
  const hotelLength = useSelector((state) => state.hotels.hotels.length);

  useEffect(() => {
    const fetchData = async () => {
      const resonse = await hotelsApi.get().catch((err) => {
        console.log('Err: ', err);
      });
      dispatch(addHotel(resonse.data));
    };
    fetchData();
  }, [dispatch]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      {hotelLength < 1 && (
        <div className="no-hotels-container">
          <h1>Welcome {user.name}</h1>
          <p className="text-dark"> There are no hotels yet</p>
          <a href="/add-hotels" className=" btn btn-primary">
            Add Hotel
          </a>
        </div>
      )}

      {hotelLength > 0 && (
        <div className="container">
          <div className="intro">
            <hr className="line"></hr>
            <h3 className="title">Enjoy your stay at any of our selections</h3>
          </div>

          <div className="cards">
            <Hotels />
          </div>
        </div>
      )}
    </>
  );
}
