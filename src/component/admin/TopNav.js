import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const logout = () => {
  localStorage.clear("data");
  toast.success("LogOut Successfully");
  setTimeout(() => {
    window.location = "/";
  }, 1000);
};

$(document).ready(function () {
  $(".navbar-toggler").on("click", function () {
    $(".sidebar").toggleClass("show");
  });
});

const TopNav = () => {
  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo mr-5" href="/dashboard">
          <h5> Home</h5>
        </a>
        <a className="navbar-brand brand-logo-mini" href="/dashboard">
          =
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        {/* <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="icon-menu"></span>
        </button> */}
        <ul className="navbar-nav mr-lg-2">
          {/* <li className="nav-item nav-search d-none d-lg-block">
            <div className="input-group">
              <div
                className="input-group-prepend hover-cursor"
                id="navbar-search-icon"
              >
                <span className="input-group-text" id="search">
                  <i className="icon-search"></i>
                </span>
              </div>
              &emsp;
              <input
                type="text"
                className="form-control"
                id="navbar-search-input"
                placeholder="Search now"
                aria-label="search"
                aria-describedby="search"
              />
            </div>
          </li> */}
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          <Dropdown className="header-toggle">
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <i className="icon-ellipsis"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="icon-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
