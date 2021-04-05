import React from "react";
import "../styles/Header.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookies from "js-cookie";

const Header = ({ props }) => {
  const logout = () => {
    axios
      .get("https://instax-backend.herokuapp.com/logout", {
        withCredentials: true,
      })
      .then((response) => {
        Cookies.remove("token");
        props.history.push("/");
      });
  };
  return (
    <React.Fragment>
      <header className="Header_section">
        <h1 className="Header_title">INSTAX</h1>
        <Button variant="contained" color="primary" onClick={logout}>
          LOGOUT
        </Button>
      </header>
    </React.Fragment>
  );
};

export default Header;
