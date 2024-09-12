import React from "react";
import logo from "/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <div className="container">
        <div className="Header-wrapper">
          <Link to={"/"}>
            <img src={logo} alt="redberry logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
