import * as React from "react";
import Footerr from "./Footerr";
import AppBar from "./AppBar";
import { useEffect, Fragment } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { API, BASE_URL } from "../../config/config";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./user.css";
import { Box } from "@mui/system";

function authHeader() {
  const user = localStorage.getItem("data");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}
const ViewOrderDetail = () => {
  const [order, setOrder] = React.useState([]);
  const [closeOrder, setCloseOrder] = React.useState([]);
  let isView = true;
  const { id } = useParams();

  const getAllOrder = async () => {
    const userIdd = localStorage.getItem("localId");
    const response = await axios
      .get(`${API.getorder}${userIdd}?status=${"open"} `, {
        headers: authHeader(),
      })
      .catch((err) => {});

    setOrder(response.data);
  };
  const getCloseOrder = async () => {
    const userIdd = localStorage.getItem("localId");
    const response = await axios
      .get(`${API.getorder}${userIdd}?status=${"close"} `, {
        headers: authHeader(),
      })
      .catch((err) => {});

    setCloseOrder(response.data);
  };
  useEffect(() => {
    getAllOrder();
    getCloseOrder();
  }, []);

  //   console.log("@@@@@order", order);
  //   console.log("$$$$$$$closeOrder", closeOrder);
  return (
    <>
      <body>
        <div className="container-scroller">
          <AppBar />
          <div className="">
            <div style={{ marginTop: "4em" }} className="content-wrapper">
              <a className="cartUnderline" href="/order">
                <h2>
                  <ArrowBackIosIcon
                    style={{ fontSize: "37px", marginBottom: "5px" }}
                  />
                  Orders Details
                </h2>
              </a>
              <br />
              {order.map((data) => (
                <>
                  <Box sx={{ maxWidth: 600 }}>
                    {data.products.map((item) => (
                      <CardContent>
                        {id === item._id ? (
                          <React.Fragment>
                            <div className="cartdiv1">
                              <div className="productBox">
                                <div style={{ textAlign: "left" }}>
                                  &emsp; &emsp;
                                  <img
                                    style={{
                                      width: "7.9em",
                                      height: "10em",
                                      borderRadius: "5px",
                                    }}
                                    src={`${BASE_URL}/${item.product.image}`}
                                    alt={item.product.name}
                                  ></img>
                                </div>
                                <div className="productDetail">
                                  <h3>{item.product.name}</h3>
                                  <p className="orderCs3">#{data._id}</p>
                                  <p className="orderCs3">
                                    Quantity : {item.quantity}
                                  </p>
                                  <p className="orderCss">
                                    ${item.product.price}
                                  </p>
                                  <p className="orderstatus">
                                    status&nbsp;{data.status}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ) : (
                          <div style={{ display: "none" }}></div>
                        )}
                      </CardContent>
                    ))}
                  </Box>
                  <br />

                  <Grid
                    container
                    spacing={3}
                    columns={16}
                    className="bordercsscart openOrdercs"
                  >
                    {data.products.map((item) => (
                      <>
                        {id === item._id ? (
                          <Fragment>
                            <Grid item xs={8} className="">
                              <div>
                                <h2 style={{ textAlign: "center" }}>
                                  Payment Information
                                </h2>
                                <h4>Payment Method</h4>
                                <div>
                                  <div>
                                    <p className="orderPera1">Mpesa</p>
                                  </div>
                                  <div>
                                    <p className="orderPera1">Phone Number</p>
                                  </div>
                                </div>
                                <div className="borderOrder"></div>
                                <h4>Payment Information</h4>
                                <div>
                                  <div>
                                    <p className="orderPera1">Order Total</p>
                                  </div>
                                  <div>
                                    <p className="orderPera1">Delivery Fee </p>
                                  </div>
                                  <div>
                                    <p className="orderPera1">Total Fee</p>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                            <Grid item xs={8}>
                              <div>
                                <h2 style={{ textAlign: "center" }}>
                                  Delivery Information
                                </h2>
                                <h4>Delivery at your address</h4>
                              </div>
                            </Grid>
                          </Fragment>
                        ) : (
                          <div style={{ display: "none" }}></div>
                        )}
                      </>
                    ))}
                  </Grid>
                </>
              ))}
              {closeOrder.map((data) => (
                <>
                  <Box sx={{ maxWidth: 600 }}>
                    {data.products.map((item) => (
                      <CardContent>
                        {id === item._id ? (
                          <React.Fragment>
                            <div className="cartdiv1">
                              <div className="productBox">
                                <div style={{ textAlign: "left" }}>
                                  &emsp; &emsp;
                                  <img
                                    style={{
                                      width: "7.9em",
                                      height: "10em",
                                      borderRadius: "5px",
                                    }}
                                    src={`${BASE_URL}/${item.product.image}`}
                                    alt={item.product.name}
                                  ></img>
                                </div>
                                <div className="productDetail">
                                  <h3>{item.product.name}</h3>
                                  <p className="orderCs3">#{data._id}</p>
                                  <p className="orderCs3">
                                    Quantity : {item.quantity}
                                  </p>
                                  <p className="orderCss">
                                    ${item.product.price}
                                  </p>
                                  <p className="orderstatus">
                                    status&nbsp;{data.status}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ) : (
                          <div style={{ display: "none" }}></div>
                        )}
                      </CardContent>
                    ))}
                  </Box>
                  <br />
                  <Grid
                    container
                    spacing={2}
                    columns={16}
                    className="bordercsscart"
                  >
                    {data.products.map((item) => (
                      <Fragment>
                        {id === item._id ? (
                          <>
                            <Grid item xs={8} className="">
                              <div>
                                <h2 style={{ textAlign: "center" }}>
                                  Payment Information
                                </h2>
                                <h4>Payment Method</h4>
                                <div>
                                  <div>
                                    <p className="orderPera1">
                                      Mpesa &emsp;
                                      &emsp;&emsp;&emsp;&emsp;&emsp;{" "}
                                      {data.paymentMethod}
                                    </p>{" "}
                                  </div>
                                  <div>
                                    <p className="orderPera1">
                                      Phone Number &emsp; &emsp; +254
                                      {data.contact}
                                    </p>
                                  </div>
                                </div>
                                <div className="borderOrder"></div>
                                <h4 style={{ marginTop: "30px" }}>
                                  Payment Information
                                </h4>
                                <div>
                                  <div>
                                    <p className="orderPera1">
                                      Order Total &emsp; &emsp; &nbsp; &emsp;{" "}
                                      {data.amount.details.subtotal}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="orderPera1">
                                      Delivery Fee &emsp; &emsp; &emsp;&nbsp;
                                      {"00"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="orderPera1">
                                      Total Fee &emsp; &emsp; &emsp; &emsp;
                                      &nbsp;
                                      {data.amount.total}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                            <Grid item xs={8}>
                              <div>
                                <h2 style={{ textAlign: "center" }}>
                                  Delivery Information
                                </h2>
                                <h4>Delivery at your address</h4>
                                <div>
                                  <p className="orderPera1">
                                    {data.shipping_address.line1}
                                  </p>
                                </div>
                              </div>
                            </Grid>
                          </>
                        ) : (
                          <div style={{ display: "none" }}></div>
                        )}
                      </Fragment>
                    ))}
                  </Grid>
                </>
              ))}
            </div>
          </div>
        </div>
        <Footerr />
      </body>
    </>
  );
};

export default ViewOrderDetail;
