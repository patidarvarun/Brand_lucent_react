import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getheader } from "../../action/HomePageAction";
import axios from "axios";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config/config";
import { Link as RouterLink } from "react-router-dom";
import "./user.css";

const headersData = [
  {
    label: "Sign Up",
    href: "/register",
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "rgb(104, 143, 78)",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function HomeHeader() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
  const user = localStorage.getItem("data");
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const headData = useSelector((state) => state.allHeader.headData.headerData);
  const [headDataa, setHeadDataa] = useState([]);
  const dispatch = useDispatch();

  // console.log("DataHeaader##############", headDataa);
  const getAllHeader = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getHeader`)
      .catch((err) => {});
    // console.log("%%%%%%%%%%fress", response);
    dispatch(getheader(response.data));
    setHeadDataa(response.data.headerData);
  };

  const token = localStorage.getItem("data");
  useEffect(() => {
    getAllHeader();
  }, []);
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div className="headerLabel">{renderList()}</div>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <div>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      if (label == "Login") {
        return (
          <div className="">
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: "inherit",
                style: { textDecoration: "none" },
                key: label,
              }}
            >
              <MenuItem>{label}</MenuItem>
            </Link>
          </div>
        );
      } else if (label == "Sign Up") {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      } else if (label == "Log Out" && token != null) {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      }
    });
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      {/* <img width="130px" src="logo2.png"></img> */}
      <a href="/" className="home">
        Home
      </a>
    </Typography>
  );

  const renderList = () => {
    return headDataa.map((itemm) => {
      return (
        <>
          {user == null ? (
            <p style={{ padding: "10px" }}>
              {itemm.labelofheader === "Cart" ? (
                <a className="linkHead" href="/login">
                  {itemm.labelofheader}
                </a>
              ) : itemm.labelofheader === "Orders" ? (
                <a className="linkHead" href="/login">
                  {itemm.labelofheader}
                </a>
              ) : itemm.labelofheader === "Contact" ? (
                <a className="linkHead" href="/login">
                  {itemm.labelofheader}
                </a>
              ) : itemm.labelofheader === "Shop" ? (
                <a className="linkHead" href="/login">
                  {itemm.labelofheader}
                </a>
              ) : (
                ""
              )}
            </p>
          ) : (
            <p style={{ padding: "10px" }} className="aaa">
              {itemm.labelofheader === "Cart" ? (
                <a className="linkHead" href="/cart">
                  {itemm.labelofheader}
                </a>
              ) : itemm.labelofheader === "Orders" ? (
                <a className="linkHead" href="/order">
                  {itemm.labelofheader}
                </a>
              ) : itemm.labelofheader === "Contact" ? (
                <a className="linkHead" href="/contactUs">
                  {itemm.labelofheader}
                </a>
              ) : itemm.labelofheader === "Shop" ? (
                <a className="linkHead" href="/">
                  {itemm.labelofheader}
                </a>
              ) : (
                ""
              )}
            </p>
          )}
        </>
      );
    });
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      if (label == "Login" && token === null) {
        return (
          <span style={{ padding: "25px" }}>
            <Button
              {...{
                key: label,
                to: href,
                component: RouterLink,
                className: "menuButton1 login",
              }}
            >
              {label}
            </Button>
          </span>
        );
      } else if (label == "Sign Up" && token === null) {
        return (
          <Button
            {...{
              key: label,
              to: href,
              component: RouterLink,
              className: "menuButton2 signUp",
            }}
          >
            {label}
          </Button>
        );
      } else if (label == "Log Out" && token != null) {
        return (
          <Button
            {...{
              key: label,
              to: href,
              component: RouterLink,
              className: "menuButton3 logout",
            }}
          >
            {label}
          </Button>
        );
      }
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
