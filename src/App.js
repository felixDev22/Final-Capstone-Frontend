import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Delete from './components/Delete/Delete';
import Splash from './components/splash/Splash';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Main from './components/main/Main';
import Room from './components/Rooms/Room';
import AddHotel from './components/addHotel/AddHotel';
import Reserve from './components/Reseve/Reserve';
import Navigation from './components/navigation/Navigation';
import Services from './components/ourServices/Services';
import ReservedHotel from './components/Reservation/ReservedHotel';
import NotFound from './components/Not Found/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isSplashPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  return (
    <>
      {!isSplashPage && !isSignupPage && !isLoginPage && <Navigation />}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/delete-hotels" element={<Delete />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hotel/:id/reserve" element={<Reserve />} />
        <Route path="/reserved-hotel" element={<ReservedHotel />} />
        <Route path="/add-hotels" element={<AddHotel />} />
        <Route path="/hotel/:id/reserve" element={<Reserve />} />
        <Route path="/our-services" element={<Services />} />
        <Route path="/hotels/:hotel_id/rooms" element={<Room />} />
        <Route path="*" exact element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
