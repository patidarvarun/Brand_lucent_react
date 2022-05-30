import * as React from "react";
import { useEffect, useState, Fragment } from "react";
import AppBar from "./AppBar";
import Footerr from "./Footerr";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
  let [toggle, setToggle] = React.useState(true);
  let defaultTabValue;

  const [order, setOrder] = React.useState([]);
  const [closeOrder, setCloseOrder] = React.useState([]);
  let status;
  let orderArray = [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    defaultTabValue = newValue;
    defaultTabValue === 0 ? (status = "open") : (status = "close");
    getAllOrder(status);
    // getCloseOrder();
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    defaultTabValue = value;
    defaultTabValue === 0 ? (status = "open") : (status = "close");
    getAllOrder(status);
    // getCloseOrder();
  }, []);

  const getAllOrder = async (status) => {
    const userIdd = localStorage.getItem("localId");
    const response = await axios
      .get(`${API.getorder}${userIdd}?status=${status} `, {
        headers: authHeader(),
      })
      .catch((err) => {});

    orderArray = response.data;
    setOrder(response.data);
  };

  function localFun(ord, pro) {
    let clickableOrder = order[ord];
    let clickableProduct = clickableOrder.products[pro];

    // console.log("@@@@@@@@@@@@@@", clickableOrder);
    // console.log("clickableProduct", clickableProduct);
  }

  // const getCloseOrder = async () => {
  //   const userIdd = localStorage.getItem("localId");
  //   const response = await axios
  //     .get(`${API.getorder}${userIdd}?status=${"close"} `, {
  //       headers: authHeader(),
  //     })
  //     .catch((err) => {});

  //   setCloseOrder(response.data);
  // };

  // console.log("order", order);
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
                    {order.message === "There is no open  orders" ? (
                      <Fragment>
                        <div className="imgorder">
                          <img src="/noOpen.png"></img>
                        </div>
                        <br />
                        <p className="orderPera">No open orders</p>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Grid
                          container
                          spacing={4}
                          columns={10}
                          className="bordercsscart"
                        >
                          {order.map((data, orderIndex) => (
                            <Grid item xs={10} className="bordercsscart">
                              {data.products.map((item, productIndex) => (
                                <Fragment>
                                  <div className="cartdiv">
                                    <div className="productBox">
                                      <div style={{ textAlign: "left" }}>
                                        &emsp; &emsp;
                                        <img
                                          style={{
                                            width: "6.3em",
                                            height: "9em",
                                            borderRadius: "5px",
                                          }}
                                          src={`${BASE_URL}/${item.product.image}`}
                                          alt={item.product.name}
                                        ></img>
                                      </div>
                                      <div className="productDetail">
                                        <h2>{item.product.name}</h2>
                                        <p className="orderCs">#{data._id}</p>
                                        <p className="orderCss">
                                          ${item.product.price}
                                        </p>
                                        <p className="orderCs">
                                          Quantity &nbsp; {item.quantity}
                                        </p>
                                        &emsp; &emsp;
                                        <br />
                                      </div>
                                      <a
                                        href={`/viewOrder/${item._id}`}
                                        style={{
                                          color: "rgb(104, 143, 78)",
                                        }}
                                        // onClick={() =>
                                        //   localFun(orderIndex, productIndex)
                                        // }
                                      >
                                        View Details
                                      </a>
                                    </div>
                                  </div>
                                  <br />
                                </Fragment>
                              ))}
                            </Grid>
                          ))}
                        </Grid>
                      </Fragment>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    {closeOrder.message === "There is no close  orders" ? (
                      <Fragment>
                        <div className="imgorder">
                          <img src="/noClosed.png"></img>
                        </div>
                        <br />
                        <p className="orderPera">No closed orders</p>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Grid
                          container
                          spacing={4}
                          columns={10}
                          className="bordercsscart"
                        >
                          {order.map((data) => (
                            <Grid item xs={10} className="bordercsscart">
                              {data.products.map((item) => (
                                <Fragment>
                                  <div className="cartdiv">
                                    <div className="productBox">
                                      <div style={{ textAlign: "left" }}>
                                        &emsp; &emsp;
                                        <img
                                          style={{
                                            width: "6.3em",
                                            height: "9em",
                                            borderRadius: "5px",
                                          }}
                                          src={`${BASE_URL}/${item.product.image}`}
                                          alt={item.product.name}
                                        ></img>
                                      </div>
                                      <div className="productDetail">
                                        <h2>{item.product.name}</h2>
                                        <p className="orderCs">#{item._id}</p>
                                        <p className="orderCss">
                                          ${item.product.price}
                                        </p>
                                        <p className="orderCs">
                                          Quantity &nbsp; {item.quantity}
                                        </p>
                                        &emsp; &emsp;
                                        <br />
                                      </div>
                                      <a
                                        href={`/viewOrder/${item._id}`}
                                        style={{ color: "rgb(104, 143, 78)" }}
                                      >
                                        View Details
                                      </a>
                                      {/* <Link
                                        to={{
                                          pathname: "/viewOrder",
                                          state: {
                                            data: "your data",
                                          },
                                        }}
                                      >
                                        View
                                      </Link> */}
                                    </div>
                                  </div>
                                  <br />
                                </Fragment>
                              ))}
                            </Grid>
                          ))}
                        </Grid>
                      </Fragment>
                    )}
                  </TabPanel>
                </SwipeableViews>
              </Box>
            </div>
          </div>
        </div>
        <Footerr />
      </body>
    </>
  );
};

export default OrderPage;
