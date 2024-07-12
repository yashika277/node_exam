import React from 'eact';
import { Link } from 'eact-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/my-products">My Products</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        {loggedIn? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;