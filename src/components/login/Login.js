/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../../features/slices/auth/login';
import './login.css';
import logo from '../../Assets/KefI-logo-green.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const islogged = useSelector((state) => state.login.islogged);
  const error = useSelector((state) => state.login.errors);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    dispatch(
      loginUser({
        user,
      }),
    );
  };

  return (
    <div className="fluid">
      <div className="row">
        <div className="col-md-6 side2-image">
          <img src={logo} className="klogo" alt="logo" />
        </div>
        <div className="col-md-6 right">
          <div className="input-box">
            <div className="intro">
              <span className="line" />
              <h1>Welcome!</h1>
            </div>
            {error && (
            <p>
              {' '}
              {error}
              {' '}
            </p>
            )}
            {islogged && <Navigate to="/main" replace />}
            <form onSubmit={handleSubmit}>
              <div className="input-filed">
                <input
                  type="text"
                  className="input"
                  id="email"
                  required
                  autoComplete="off"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmail}
                />
              </div>

              <div className="input-filed">
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input"
                    id="password"
                    required
                    autoComplete="off"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="see-password"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                  </span>
                </div>
              </div>

              <button type="submit" className="submit">
                <p>Login</p>
              </button>
            </form>
            <div className="sign-in">
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html:
                    "Don't have an Account?. <a href='./signup'>Sign-Up</a>",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
