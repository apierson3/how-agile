import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import Logo from './logo.png';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';

function Navbar({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate('/'); // Navigate to the homepage after signing out
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div className="navbar-container">
      <img className="navbar-img" src={Logo} alt="Logo" />
      <h1 className="navbar-logo">HowAgile</h1>
      <div className="navbar-links-container">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/assessments">Assessments</Link></li>
          <li><Link to="/results">Results</Link></li>
        </ul>
        <div className='navbar-account'>
          {!isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <div className="dropdown">
              <button className="dropbtn">
                Account  <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <div className="dropdown-content">
                {isAdmin && <Link to="/createpost">Create a Post</Link>}
                {isAdmin && <Link to="/manageposts">Edit a Post</Link>}
                {isAdmin && <Link to="/createproduct">Create a Product</Link>}
                <Link to="/profile">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
                <button onClick={signUserOut} className="logout-button">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
