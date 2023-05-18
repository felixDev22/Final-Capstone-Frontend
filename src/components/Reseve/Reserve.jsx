import React, { useState, useEffect } from 'react';
import './Reserve.css';
import Navigation from '../navigation/Navigation';
import { useLocation, useParams } from "react-router-dom";
import Dialog from '../Dialog/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectReservation, reserveActions, selectReserveError } from '../../features/slices/reserve/reserveSlice';
import {
  fetchHotel,
  selectSingleHotel,
  selectSingleHotelLoading,
  selectSingleHotelError,
} from '../../features/slices/reserve/singleReserveSlice';


const Reserve = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [error, setError] = useState(null);

  const [reservationSuccessful, setReservationSuccessful] = useState(false);

  const [isRoomTypeValid, setIsRoomTypeValid] = useState(true);

  const dispatch = useDispatch();
  const reserve = useSelector(selectReservation);

  const hotel = useSelector(selectSingleHotel);
  // console.log(hotel);

  const { id } = useParams();

  // console.log(id)

  useEffect(() => {
    console.log(dispatch(fetchHotel(id)))
  }, [dispatch, id]);

  const [reservation, setReservation] = useState({
    checkInDate: '',
    checkOutDate: '',
    adults: 1,
    children: 0,
    rooms: 1,
    roomType: '',
  });

  useEffect(() => {
  if (reservation.roomType === '') {
    setReservation({ ...reservation, roomType: 'Single' });
  }
}, [reservation]);


  const location = useLocation();
  // const hotel = location.state?.hotel;

  // console.log(hotel);

if (!hotel) {
  return (
    <div>
      <Dialog message="Loading..." isLoading={true} />
    </div>
  );
} else {
  console.log("This is the hotel data coming in: ", hotel);
}


  const validateReservation = () => {
    if (!checkInDate || !checkOutDate) {
      return false;
    } else if (reservation.adults < 1 || reservation.adults > 4) {
      return false;
    } else if (reservation.children < 0 || reservation.children > 6) {
      return false;
    } else if (reservation.rooms < 1) {
      return false;
    }

    return true
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    if (!validateReservation()) {
      console.log("Data not valid");
      return;
    }
    setIsLoading(true);

    try {
      const formData = {
        name: "John Doe",
        price: 100,
        checkInDate: "2021-08-01",
        checkOutDate: "2021-08-02",
        adults: 2,
        children: 0,
        rooms: 1,
        roomType: "Single",
      };

      const response = await dispatch(reserveActions.reserve(formData));

      if (response.payload) {
        setIsLoading(false);
        setDialogVisible(true);
        setReservationSuccessful(true);
        console.log("Reservation successful!");
        // console.log(response.payload.data);
        console.log("Reserve Data:", reserve);

      } else {
        setIsLoading(false);
        setError("An error occurred during room reservation. Please try again later.");
        console.error("An error occurred during room reservation:", selectReserveError());
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred during room reservation. Please try again later.");
      console.error("An error occurred during room reservation:", error);
    }
    };

  useEffect(() => {
    if (isLoading) {
      setDialogVisible(true);
    } else {
      setDialogVisible(false);
    }
  }, [isLoading]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const getMinCheckOutDate = () => {
    if (!checkInDate) {
      return getCurrentDate();
    }

    const checkIn = new Date(checkInDate);
    checkIn.setDate(checkIn.getDate() + 1);

    const year = checkIn.getFullYear();
    let month = checkIn.getMonth() + 1;
    let day = checkIn.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const calculateNumberOfDays = (checkIn, checkOut) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return numberOfDays;
  };

  const getTotalPrice = () => {
    const basePrice = hotel.price;
    const numberOfRooms = reservation.rooms;
    const numberOfDays = calculateNumberOfDays(checkInDate, checkOutDate);

    return basePrice * numberOfDays * numberOfRooms;
  };

  const [totalPrice, setTotalPrice] = useState(getTotalPrice());

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [checkInDate, checkOutDate, reservation.rooms]);

  const isRoomButtonDisabled = reservation.adults >= 2 && reservation.children >= 4;

  const isAdultMaximumReached = reservation.adults >= 4;
  const isAdultMinimumReached = reservation.adults <= 1;
  const isChildrenMaximumReached = reservation.children >= 6;

  const buttonClassName = validateReservation() ? (reservationSuccessful ? 'invalid-button' : 'reserve-button') : 'invalid-button';

  return (
    <>
      <Navigation />
      <div className="reserve-container">
        <div className="reserve-intro">
          <span className="line"></span>
          <h3 className="reserve-title">Book your Hotel Reservations</h3>
          <div className="reserve-subtitle">
            {/* <p className="hotel-name">{hotel.name}</p> */}
            <span className="hotel-price-container">
              <p className="hotel-price">Price:</p>
              {/* <p className="actual-price">$ {isNaN(totalPrice) ? hotel.price : totalPrice.toFixed(2)}</p> */}
            </span>
          </div>
        </div>

        <div className="reserve-form-container">
          <div className="reserve-left">
            <div className="reserve-card">
              {/* <img src={hotel.photo} alt="Hotel Image" className="reserve-hotel-image" /> */}
            </div>
          </div>

          <div className="reserve-right">
            <form onSubmit={handleReservationSubmit}>
              <div>
                <input
                  type="date"
                  id="check-in-date"
                  name="check-in-date"
                  className="form-input"
                  placeholder="Check-in Date"
                  value={checkInDate}
                  min={getCurrentDate()}
                  onChange={(e) => { setCheckInDate(e.target.value); setReservation({ ...reservation, checkInDate: e.target.value }); }}
                />
              </div>

              <div>
                <input
                  type="date"
                  id="check-out-date"
                  name="check-out-date"
                  className="form-input"
                  placeholder="Check-out Date"
                  value={checkOutDate}
                  min={getMinCheckOutDate()}
                  onChange={(e) => { setCheckOutDate(e.target.value); setReservation({ ...reservation, checkOutDate: e.target.value }); }}
                />
              </div>

              <div className="adult-children">
                <div className="total-adult">
                  <p className="adult">Adults</p>
                  <button type="button" className="minus"
                    onClick={() => setReservation({ ...reservation, adults: Math.max(reservation.adults - 1, 1) })}
                    disabled={ isAdultMinimumReached }
                  >
                    -
                  </button>
                  <p className="number">{reservation.adults}</p>
                  <button type="button" className="plus"
                    onClick={() => setReservation({ ...reservation, adults: Math.min(reservation.adults + 1, 4),})
                }
                disabled={isAdultMaximumReached}
                  >
                    +
                  </button>
                </div>

                <div className="total-children">
                  <p className="children">Children</p>
                  <button type="button" className="minus"
                    onClick={() => setReservation({ ...reservation, children: Math.max(reservation.children - 1, 0) })}
                    disabled={isRoomButtonDisabled}
                  >
                    -
                  </button>
                  <p className="number">{reservation.children}</p>
                  <button type="button" className="plus"
                    onClick={() =>
                  setReservation({ ...reservation, children: Math.min(reservation.children + 1, 6), })
                }
                disabled={isRoomButtonDisabled || isChildrenMaximumReached}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className='room-type'>
                <select
                    className={`room-type-select ${isRoomTypeValid ? '' : 'invalid'}`}
                    value={reservation.roomType}
                    onChange={(e) => {
                      setReservation({ ...reservation, roomType: e.target.value });
                      setIsRoomTypeValid(true);
                    }}
                  >
                    <option value="">Select a room type</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="quad">Quad</option>
                    <option value="queen">Queen</option>
                    <option value="king">King</option>
                    <option value="twin">Twin</option>
                    <option value="double-double">Double-Double</option>
                    <option value="studio">Studio</option>
                    <option value="master-suite">Master Suite</option>
                  </select>

                  {!isRoomTypeValid && <p className="error-message">Please select a room type</p>}

              </div>

              <div className="rooms-container">
                <p className="rooms">Rooms</p>
                <button type="button" className="minus"
                  onClick={() => setReservation({ ...reservation, rooms: Math.max(reservation.rooms - 1, 1) })}
                  disabled={isRoomButtonDisabled}
                >
                  -
                </button>
                <p className="number">{reservation.rooms}</p>
                <button type="button" className="plus"
                  onClick={() => setReservation({ ...reservation, rooms: Math.min(reservation.rooms + 1, 6), })}
                  disabled={isRoomButtonDisabled}
                >
                  +
                </button>
              </div>
                <div className="other-images">
                  <div className="image-left">hello</div>
                  <div className="image-right">other image</div>
                </div>

              <div className="reserve-buttons">

                <button
                  type="submit"
                  className={buttonClassName}
                  disabled = {
                    !validateReservation() || reservationSuccessful
                  }
                  onClick={handleReservationSubmit}
                >
                  {
                    isLoading ? 'Reserving...' : (reservationSuccessful ? 'Reserved' : 'Reserve')
                  }
                </button>

                  {error && (
                      <div className="error-message">
                        <p>{error}</p>
                      </div>
                    )}

                    {dialogVisible && !error && (
                      <Dialog message="Loading..." isLoading={isLoading} />
                    )}


                  {/* {dialogVisible && !error && (
                    <div className="success-dialog">
                      <p>Reservation successful!</p>
                    </div>
                  )} */}

              <button type="button" className="my-reservation" to='/reservation'>
                Rooms
              </button>
          </div>
        </form>
          </div>
        </div>
      </div>
    </>

  );
};

export default Reserve;
