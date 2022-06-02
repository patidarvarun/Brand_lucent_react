import * as React from "react";
import Footerr from "./Footerr";
import AppBar from "./AppBar";
import { useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { BASE_URL } from "../../config/config";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import "./user.css";

const ViewOrderDetail = () => {
  const location = useLocation();
  let product = location.state.product;
  let order = location.state.order;
  console.log("porderroduct", order.paymentMethod);
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

              <div className="closeOrderClass">
                <div className="anotherDiv">
                  <Box sx={{ maxWidth: 600 }}>
                    <CardContent>
                      <React.Fragment>
                        <div className="cartdiv1 shadowcss">
                          <div className="productBox">
                            <div style={{ textAlign: "left" }}>
                              &emsp; &emsp;
                              <img
                                style={{
                                  width: "7.9em",
                                  height: "10em",
                                  borderRadius: "5px",
                                }}
                                src={`${BASE_URL}/${product.product.image}`}
                                alt={product.product.name}
                              ></img>
                            </div>
                            <div className="productDetail">
                              <h3>{product.product.name}</h3>
                              <p className="orderCs3">#{order._id}</p>
                              <p className="orderCs3">
                                Quantity : {product.quantity}
                              </p>
                              <p className="orderCss">
                                ${product.product.price}
                              </p>
                              <p className="orderstatus">
                                Status&nbsp;
                                {order.status == "open" ? "Pending" : "Done"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    </CardContent>
                  </Box>
                  <br />
                  <br />
                  <br />
                  <br />
                  <Grid
                    container
                    spacing={2}
                    columns={16}
                    className="bordercsscart"
                  >
                    <Fragment>
                      <>
                        <Grid item xs={8} className="">
                          <div className="shadowcss">
                            <h2
                              style={{ textAlign: "center", fontSize: "37px" }}
                            >
                              Payment Information
                            </h2>
                            <h4 className="paymentHeading">Payment Method</h4>
                            <div className="paymentDetailclass">
                              {order.paymentMethod != "" ? (
                                <Fragment>
                                  <div>
                                    <p className="orderPera1">
                                      Mpesa &emsp;&emsp;&emsp;&emsp; &emsp;
                                      &emsp;
                                      {order.paymentMethod}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="orderPera1">
                                      Phone Number &emsp; &emsp; +254
                                      {order.contact}
                                    </p>
                                  </div>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <div>
                                    <p className="orderPera1">
                                      Phone Number &emsp; &emsp; +254
                                      {order.contact}
                                    </p>
                                  </div>
                                  <h5 className="cashon">Cash On Delivery</h5>
                                </Fragment>
                              )}
                            </div>
                            <div className="borderOrder"></div>
                            <h4
                              className="paymentHeading"
                              style={{ marginTop: "30px" }}
                            >
                              Payment Information
                            </h4>
                            <div className="paymentDetailclass">
                              <div>
                                <p className="orderPera1">
                                  Order Total &emsp; &emsp; &nbsp; &emsp;{" "}
                                  {product.quantity * product.product.price}
                                  {".00"}
                                </p>
                              </div>
                              <div>
                                <p className="orderPera1">
                                  Delivery Fee &emsp; &emsp; &emsp;&nbsp;
                                  {"00.00"}
                                </p>
                              </div>
                              <div>
                                <p className="orderPera1">
                                  Total Fee &emsp; &emsp; &emsp; &emsp; &nbsp;
                                  {product.quantity * product.product.price}
                                  {".00"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="shadowcss">
                            <h2 style={{ textAlign: "center" }}>
                              Delivery Information
                            </h2>
                            <h4 className="paymentHeading">
                              Delivery at your address
                            </h4>
                            <div className="paymentDetailaddress">
                              <p className="orderPera1">
                                {order.shipping_address.line1}
                              </p>
                            </div>
                          </div>
                        </Grid>
                      </>
                    </Fragment>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footerr />
      </body>
    </>
  );
};

export default ViewOrderDetail;
