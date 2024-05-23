import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { addReservation, deleteReservation } from '../../features/reservation';
import rectangle from '../../Assets/rectangle.png';
import Reserved from '../Reserved/Reserved';
import './ReservedHotel.css';

function ReservedHotel() {
  const dispatch = useDispatch();
  const reservation = useSelector((state) => state.reservation.reservation);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hotelLength = useSelector(
    (state) => state.reservation.reservation.length,
  );
  const [user, setUser] = useState([]);
  const totalPrice = (reservation) => {
    let totalPrice = reservation.price;

    switch (reservation.room_type) {
      case 'single':
        break;
      case 'double':
        totalPrice += totalPrice * 0.25;
        break;
      case 'master-suite':
        totalPrice += totalPrice * 0.5;
        break;
      case 'king-size':
        totalPrice += totalPrice * 0.75;
        break;
      default:
        break;
    }

    const checkInDate = new Date(reservation.check_in);
    const checkOutDate = new Date(reservation.check_out);
    const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays * totalPrice;
  };
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(
          'https://kefi-hotel-booking-app.onrender.com/api/v1/reservations',
        );
        const reservationsWithTotalPrice = response.data.map((reservation) => ({
          ...reservation,
          totalPrice: totalPrice(reservation),
        }));
        dispatch(addReservation(reservationsWithTotalPrice));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchReservation();
  }, [dispatch]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUser(user);
    }
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://kefi-hotel-booking-app.onrender.com/v1/reservations/${id}`,
      )
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        dispatch(deleteReservation(id));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % reservation.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      currentIndex === 0 ? reservation.length - 1 : currentIndex - 1,
    );
  };

  return (
    <>
      {hotelLength < 1 && (
        <div className="no-hotels-container">
          <h1>
            Hi
            {user.name}
          </h1>
          <p className="text-dark">
            {' '}
            You can not reserve.
            { ' '}
            There are no hotels yet in the system
          </p>
        </div>
      )}
      {hotelLength > 0 && (
        <div className="container">
          <div className="intro">
            <h2 className="reserved-hotel">Reserved Hotels</h2>
            <img src={rectangle} alt="rectangle" />
            <p className="reserved-hotel-para">
              All your Reserved hotels in one place
            </p>
          </div>
          <div className="hotel-lists">
            <Link to="/main">
              <button type="button" className="reservebtn">
                Reserve
              </button>
            </Link>
          </div>
          <Reserved
            reservation={reservation}
            currentIndex={currentIndex}
            onNext={handleNext}
            onPrev={handlePrev}
            onDelete={handleDelete}
          />
        </div>
      )}
    </>
  );
}

export default ReservedHotel;
