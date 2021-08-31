import React from "react";
import logo from "../assests/tdcx-logo.png";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Header() {
  return (
    <div className="header">
      <AccountCircleIcon className="header-icon" fontSize="large" />
      <img
      className="header-logo"
      src={logo}
      alt="logo"
      />
      <ExitToAppIcon className="header-icon" fontSize="large"  />
    </div>
  );
}
