import * as React from "react";
import AppBar from "./AppBar";
import Footerr from "./Footerr";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import $ from "jquery";
import validate from "jquery-validation";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { API } from "../../config/config";
import axios from "axios";
import { getLocation } from "../../action/HomePageAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";
toast.configure();

function authHeader() {
  const user = localStorage.getItem("data");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #b1d182",
  boxShadow: 24,
  p: 4,
};
const steps = ["Account Info", "Delivery Information", "Payment"];

const Checkout = (props) => {
  const [value, setValue] = React.useState("1");
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [locationData, setLocationData] = useState();
  const [cartData, setCartData] = useState([]);
  const [location, setLocation] = useState();
  const [oldAddress, setOldAddress] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value1, setValue1] = React.useState("card");
  let tempPrice = 0;
  let price = 0;
  let items = [];

  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };

  let nextTab = "0";
  const CartData = useSelector((state) => state);
  const dispatch = useDispatch();

  const getCartDetail = async () => {
    const id = localStorage.getItem("localId");
    const response = await axios
      .get(`${API.viewCart}${id} `, {
        headers: authHeader(),
      })
      .catch((err) => {});

    setCartData(response.data.productOfCart);
  };
  // const getOldAddress = async () => {
  //   const id = localStorage.getItem("localId");
  //   const response = await axios
  //     .get(`${API.viewAddress}${id} `, {
  //       headers: authHeader(),
  //     })
  //     .catch((err) => {});
  //   setOldAddress(response.data.accountInfo);
  // };

  const handleChange = async (newValue) => {
    const id = localStorage.getItem("localId");
    setValue(newValue);
    const response = await axios
      .get(`${API.locationDetails}${id} `, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setLocationData(response.data.accountInfo);
    dispatch(getLocation(response.data.accountInfo));
  };

  useEffect(() => {
    $(document).ready(function () {
      $("#addressValidation").validate({
        rules: {
          name: {
            required: true,
            // rangelength: [2, 10],
          },
          phone: { required: true, digits: true, minlength: 10, maxlength: 10 },

          email: {
            required: true,
            email: true,
          },
          address: {
            required: true,
          },
        },
        messages: {
          name: {
            required: "<p style='color:red'>Please enter your fullname</P>",
            // rangelength:
            //   "<p style='color:red'>Your name must consist of at least 2 characters</p>",
          },

          phone: {
            // required: "<p style='color:red'>Please enter your phone Number</p>",
            required: "<p style='color:red'>Please enter phone number</p>",
            digits: "<p style='color:red'>Please enter valid phone number</p>",
            minlength:
              "<p style='color:red'>Phone number field accept only 10 digits</p>",
            maxlength:
              "<p style='color:red'>Phone number field accept only 10 digits</p>",
            // minlength: "<p style='color:red'>Your phone number must consist of at least 2 characters</p>"
          },
          email: {
            required: "<p style='color:red'>Please provide a email</p>",
            email:
              "<p style='color:red'>Please enter a valid email address.</p>",
          },
          address: {
            required: "<p style='color:red'>Please provide a password</p>",
          },
        },
      });
    });
    getCartDetail();
    // getOldAddress();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    const id = localStorage.getItem("localId");
    const requestData = {
      userid: id,
      fullName: name,
      phone: phone,
      email: email,
      location: address,
    };
    axios
      .post(`${API.addAccountInfo}`, requestData, {
        headers: authHeader(),
      })
      .then((response) => (response.status == "200" ? handleTab() : ""));
  }

  function handlePopup(e) {
    e.preventDefault();
    handleOpen();
  }
  function handleNext(e) {
    e.preventDefault();
    nextTab = "3";
    handleChange(nextTab);
  }

  function handleTab() {
    nextTab = "2";
    handleChange(nextTab);
  }
  function handleTab3() {
    nextTab = "3";
    handleChange(nextTab);
  }
  function handleLocation(e) {
    e.preventDefault();
    handleOpen();
    const id = localStorage.getItem("localId");
    const requestData = {
      userid: id,
      accountid: locationData[0]._id,
      newLocation: location,
    };
    axios
      .put(`${API.locationChange}`, requestData, {
        headers: authHeader(),
      })
      .then((response) => (response.status == "200" ? handleTab3() : ""));
  }
  function handlePayment() {
    if (value1 == "card") {
      const requestData = {
        userid: localStorage.getItem("localId"),
        items: items,
        amount: {
          currency: "USD",
          total: price,
        },
      };
      axios
        .post(`${API.paymentMethod}`, requestData, {
          headers: authHeader(),
        })
        .then((response) =>
          response.status == "200"
            ? (window.location = response.data.redirectUrl)
            : toast.warn("Something went wrong..")
        );
      // console.log("Cardd");
    } else if (value1 == "cashOnDelivery") {
      console.log("Cash on deleviry", items);
    } else {
      console.log("Another Method");
    }
  }

  return (
    <>
      <body>
        <div className="container-scroller">
          <AppBar />
          <div className="">
            <div style={{ marginTop: "4em" }} className="content-wrapper">
              <a className="cartUnderline" href="/cart">
                <h2>
                  <ArrowBackIosIcon
                    style={{ fontSize: "37px", marginBottom: "5px" }}
                  />
                  Checkout
                </h2>
              </a>
              <div>
                <Box sx={{ width: "100%" }}>
                  <TabContext value={value}>
                    <TabPanel value="1">
                      <div className="">
                        <Box sx={{ width: "100%" }}>
                          <Stepper activeStep={0} alternativeLabel>
                            {steps.map((label) => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        </Box>
                      </div>
                      <br />
                      <br />
                      <div
                        className="container h-100"
                        style={{ marginTop: "45px" }}
                      >
                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="col-lg-12 col-xl-11">
                            <div className="backgrondcolorr">
                              <div className="card-body p-md-5">
                                <div className="leftCss">
                                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    {/* <Box>
                                      {oldAddress.map((aa) => (
                                        <div>
                                          <h6>{aa.fullName}</h6>
                                          <p>
                                            {aa.location},{aa.phone}
                                          </p>
                                        </div>
                                      ))}
                                    </Box> */}
                                    <form
                                      id="addressValidation"
                                      className="mx-1 mx-md-4"
                                      noValidate="novalidate"
                                      onSubmit={handleSubmit}
                                    >
                                      <div className="d-flex flex-row align-items-center mb-4">
                                        {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                                        <div className="form-outline flex-fill mb-0">
                                          <label
                                            className="form-label"
                                            for="name"
                                            style={{ color: "#6a5050" }}
                                          >
                                            Your fullname*
                                          </label>
                                          <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control feildcss"
                                            placeholder="Enter your fullname"
                                            onChange={(e) =>
                                              setName(e.target.value)
                                            }
                                          />
                                          {""}
                                          <span id="demo2"></span>
                                        </div>
                                      </div>
                                      <div className="d-flex flex-row align-items-center mb-4">
                                        {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                                        <div className="form-outline flex-fill mb-0">
                                          <label
                                            className="form-label"
                                            for="form3Example3c"
                                            style={{ color: "#6a5050" }}
                                          >
                                            Your Phone Number*
                                          </label>
                                          <input
                                            type="number"
                                            id="phone"
                                            name="phone"
                                            className="form-control  feildcss"
                                            placeholder="+254"
                                            onChange={(e) =>
                                              setPhone(e.target.value)
                                            }
                                          />
                                          <span id="demo2"></span>
                                        </div>
                                      </div>

                                      <div className="d-flex flex-row align-items-center mb-4">
                                        {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                                        <div className="form-outline flex-fill mb-0">
                                          <label
                                            className="form-label"
                                            for="form3Example3c"
                                            style={{ color: "#6a5050" }}
                                          >
                                            Email address*
                                          </label>
                                          <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control  feildcss"
                                            placeholder="Enter email address"
                                            onChange={(e) =>
                                              setEmail(e.target.value)
                                            }
                                          />
                                          <span id="demo2"></span>
                                        </div>
                                      </div>

                                      <div className="d-flex flex-row align-items-center mb-4">
                                        <div className="form-outline flex-fill mb-0">
                                          <label
                                            className="form-label"
                                            for="form3Example4c"
                                            style={{ color: "#6a5050" }}
                                          >
                                            Location*
                                          </label>
                                          <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            className="form-control  feildcss feildcss"
                                            placeholder="Enter your Location"
                                            onChange={(e) =>
                                              setAddress(e.target.value)
                                            }
                                          />
                                          <span id="demo2"></span>
                                        </div>
                                      </div>

                                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button
                                          type="submit"
                                          style={{
                                            background: "#688f4e",
                                            width: "9em",
                                            border: "none",
                                            height: "50px",
                                          }}
                                          className="btn btn-primary "
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">
                      <div className="">
                        <Box sx={{ width: "100%" }}>
                          <Stepper activeStep={1} alternativeLabel>
                            {steps.map((label) => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        </Box>
                      </div>
                      <div
                        className="container h-100"
                        style={{ marginTop: "45px" }}
                      >
                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="col-lg-12 col-xl-11">
                            <div className="backgrondcolorr">
                              <div className="card-body p-md-5">
                                <div className="leftCss">
                                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <h4>User Location Information</h4>
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                      {locationData == null
                                        ? ""
                                        : locationData.map((data) => (
                                            <div>{data.location}</div>
                                          ))}
                                      <br />
                                      <br />
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                      <form onSubmit={handlePopup}>
                                        <button
                                          type="submit"
                                          style={{
                                            background: "#688f4e",
                                            width: "9em",
                                            border: "none",
                                            height: "50px",
                                          }}
                                          className="btn btn-primary "
                                        >
                                          Change
                                        </button>
                                      </form>
                                    </div>
                                    <br />
                                    <div style={{ textAlign: "right" }}>
                                      <form onSubmit={handleNext}>
                                        <button
                                          type="submit"
                                          style={{
                                            background: "#688f4e",
                                            width: "9em",
                                            border: "none",
                                            height: "50px",
                                          }}
                                          className="btn btn-primary "
                                        >
                                          Next
                                        </button>
                                      </form>
                                      <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                      >
                                        <Box sx={style}>
                                          <form onSubmit={handleLocation}>
                                            <TextareaAutosize
                                              aria-label="minimum height"
                                              minRows={3}
                                              placeholder="Enter your new location"
                                              id="location"
                                              name="location"
                                              onChange={(e) =>
                                                setLocation(e.target.value)
                                              }
                                              style={{
                                                width:
                                                  " -webkit-fill-available",
                                              }}
                                            />
                                            <div style={{ textAlign: "right" }}>
                                              <br />
                                              {location == "" ? (
                                                <button
                                                  type="submit"
                                                  style={{
                                                    background: "#688f4e",
                                                    width: "9em",
                                                    border: "none",
                                                    height: "50px",
                                                  }}
                                                  className="btn btn-primary "
                                                  disabled
                                                >
                                                  Next
                                                </button>
                                              ) : (
                                                <button
                                                  type="submit"
                                                  style={{
                                                    background: "#688f4e",
                                                    width: "9em",
                                                    border: "none",
                                                    height: "50px",
                                                  }}
                                                  className="btn btn-primary "
                                                >
                                                  Next
                                                </button>
                                              )}
                                            </div>
                                          </form>
                                        </Box>
                                      </Modal>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="3">
                      <div className="">
                        <Box sx={{ width: "100%" }}>
                          <Stepper activeStep={2} alternativeLabel>
                            {steps.map((label) => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        </Box>
                      </div>
                      <div
                        className="container h-100"
                        style={{ marginTop: "45px" }}
                      >
                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="col-lg-12 col-xl-11">
                            <div className="backgrondcolorr">
                              <Grid container spacing={4} columns={16}>
                                <Grid item xs={10}>
                                  {cartData.map((data) => (
                                    <>
                                      {data.cart.map((item) => (
                                        <div style={{ display: "none" }}>
                                          {
                                            (((tempPrice =
                                              item.quantity *
                                              item.product.price),
                                            (price = price + tempPrice)),
                                            items.push({
                                              name: item.product.name,
                                              sku: "sku123",
                                              price: item.product.price,
                                              currency: "USD",
                                              quantity: item.quantity,
                                            }))
                                          }
                                        </div>
                                      ))}
                                    </>
                                  ))}

                                  <div>
                                    <h4>Payment Method</h4>
                                  </div>
                                  <FormControl>
                                    <RadioGroup
                                      aria-labelledby="demo-controlled-radio-buttons-group"
                                      name="controlled-radio-buttons-group"
                                      value={value1}
                                      onChange={handleChange1}
                                    >
                                      <FormControlLabel
                                        value="card"
                                        control={<Radio />}
                                        label="Card"
                                      />
                                      <FormControlLabel
                                        value="cashOnDelivery"
                                        control={<Radio />}
                                        label="Cash on Delivery"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                  <div className="cartSdiv">
                                    <h3 style={{ textAlign: "center" }}>
                                      Order Summary
                                    </h3>
                                    <br />
                                    <br />
                                    <br />
                                    <div style={{ display: "inline-flex" }}>
                                      <p className="pLeft">Sub Total</p> &emsp;
                                      &emsp;
                                      <p className="pRight">${price}</p>
                                    </div>
                                    <div style={{ display: "inline-flex" }}>
                                      <p className="pLeft">Delivery Fee</p>
                                      <p className="pRight">$00</p>
                                    </div>
                                    <hr style={{ color: "rgb(70 169 2)" }} />
                                    <div style={{ display: "inline-flex" }}>
                                      <p className="pLeft">Total</p> &emsp;
                                      &emsp; &emsp; &emsp;&nbsp;
                                      <p className="pRight">${price}</p>
                                    </div>
                                    <br />
                                    <br />
                                    <div style={{ textAlign: "center" }}>
                                      {/* <a
                                        className="checkoutLink"
                                        href="/checkout"
                                      > */}
                                      <button
                                        type="submit"
                                        className="cartCheckout"
                                        onClick={handlePayment}
                                      >
                                        Checkout
                                      </button>
                                      {/* </a> */}
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <Footerr />
      </body>
    </>
  );
};

export default Checkout;
