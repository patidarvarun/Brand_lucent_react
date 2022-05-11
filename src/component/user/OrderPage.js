import * as React from "react";
import { useEffect, useState, Fragment } from "react";
import AppBar from "./AppBar";

import Footerr from "./Footerr";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../style/vendors/feather/feather.css";
import "../../style/vendors/ti-icons/css/themify-icons.css";
import "../../style/vendors/css/vendor.bundle.base.css";
import "../../style/vendors/datatables.net-bs4/dataTables.bootstrap4.css";
import "../../style/vendors/ti-icons/css/themify-icons.css";
import "../../style/js/select.dataTables.min.css";
import "../../style/css/vertical-layout-light/style.css";
import "../../style/images/favicon.png";
import "../../style/css/sidebar.css";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import "./user.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCart } from "../../action/HomePageAction";
import { API, BASE_URL } from "../../config/config";
import Checkout from "./Checkout";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBarr from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

toast.configure();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function authHeader() {
  const user = localStorage.getItem("data");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}

const OrderPage = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <body>
        <div className="container-scroller">
          <AppBar />
          <div className="">
            <div style={{ marginTop: "4em" }} className="content-wrapper">
              <a className="cartUnderline" href="/">
                <h2>
                  <ArrowBackIosIcon
                    style={{ fontSize: "37px", marginBottom: "5px" }}
                  />
                  Orders
                </h2>
              </a>
              <br />
              <Box sx={{ bgcolor: "background.paper", width: 500 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Open Orders" {...a11yProps(0)} />
                  <Tab label="Closed Orders" {...a11yProps(1)} />
                </Tabs>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <div className="imgorder">
                      <img src="/noOpen.png"></img>
                    </div>
                    <br />
                    <p className="orderPera">No open orders</p>
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className="imgorder">
                      <img src="/noClosed.png"></img>
                    </div>
                    <br />
                    <p className="orderPera">No closed orders</p>
                  </TabPanel>
                </SwipeableViews>
              </Box>
              {/* <Grid
                container
                spacing={4}
                columns={16}
                className="bordercsscart"
              >
                {allData.map((data) => (
                  <Grid item xs={10} className="bordercsscart">
                    {data.cart.map((item) => (
                      <Fragment>
                        <div className="cartdiv">
                          <div style={{ display: "none" }}>
                            {
                              ((tempPrice = item.quantity * item.product.price),
                              (price = price + tempPrice))
                            }
                          </div>

                          <div style={{ display: "inline-flex" }}>
                            <div style={{ textAlign: "left" }}>
                              &emsp; &emsp;
                              <img
                                style={{
                                  width: "6em",
                                  height: "6em",
                                  borderRadius: "5px",
                                }}
                                src={`${BASE_URL}/${item.product.image}`}
                                alt={item.product.name}
                              ></img>
                            </div>
                            &emsp;
                            <p className="pname">{item.product.name}</p>
                            &emsp; &emsp; &emsp; &emsp;
                            <div style={{ display: "inline-flex" }}>
                              <div className="borderCart2">
                                &nbsp;
                                <button
                                  className="buttIcon"
                                  // onClick={() => decreaseQuantity(productDetails._id)}
                                >
                                  <RemoveIcon style={{ fontSize: "30px" }} />
                                </button>
                                &emsp; &emsp;
                                <span style={{ fontSize: "23px" }} className="">
                                  {item.quantity}
                                </span>
                                &emsp; &emsp;
                                <button
                                  className="buttIcon"
                                  // onClick={() => increaseQuantity(productDetails._id)}
                                >
                                  <AddIcon style={{ fontSize: "30px" }} />
                                </button>
                                &nbsp;
                              </div>
                            </div>
                            &emsp; &emsp; &emsp; &emsp;
                            <div>
                              <p className="pname">price</p>
                              <p className="pname">${item.product.price}</p>
                            </div>
                            &emsp; &emsp; &emsp; &emsp;
                            <a
                              onClick={() =>
                                handleDelete(data._id, item.product._id)
                              }
                            >
                              <DeleteIcon />
                            </a>
                          </div>
                        </div>
                        <br />
                      </Fragment>
                    ))}
                  </Grid>
                ))} */}
              {/* </Grid> */}
            </div>
          </div>
        </div>
        <Footerr />
      </body>
    </>
  );
};

export default OrderPage;
