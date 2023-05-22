import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { newHotel } from '../../features/hotels';
import { Navigate } from 'react-router-dom';
import '../../components/login/login.css';
import './addHotel.css';
const AddHotel = () => {
  const dispatch = useDispatch();
  const [hotelName, setHotelName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [isSent, setSent] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUser(user);
    }
  }, []);

  const handleNewHotel = (e) => {
    e.preventDefault();
    const data = {
      user_id: user.id,
      name: hotelName,
      photo: photoURL,
      rating: parseInt(rating),
      location: location,
      price: parseInt(price),
      desc: desc,
    };
    axios
      .post('http://localhost:3000/api/v1/hotels', data)
      .then((response) => {
        dispatch(newHotel(response.data));
        setSent(true);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="wrapper-add">
      <div>
        <div className="add-title">
          <h4>Add hotel:</h4>
        </div>
        {isSent && <Navigate to="/main" replace={true} />}
        <form onSubmit={handleNewHotel}>
          <div className="input-field">
            <input
              type="text"
              className="input"
              id="hotelName"
              required
              autoComplete="off"
              placeholder="Hotel Name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              className="input"
              id="photo"
              required
              autoComplete="off"
              placeholder="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="number"
              className="input"
              id="rating"
              required
              autoComplete="off"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              className="input"
              id="location"
              required
              autoComplete="off"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              className="input"
              id="price"
              required
              autoComplete="off"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              className="input"
              id="desc"
              required
              autoComplete="off"
              placeholder="Brief Intro"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button type="submit" className="add-btn">
            <p>Add</p>
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddHotel;
