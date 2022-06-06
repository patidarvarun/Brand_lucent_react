import * as React from "react";
import { useEffect, useState, Fragment } from "react";
import AppBar from "./AppBar";
import Footerr from "./Footerr";
import axios from "axios";
import Grid from "@mui/material/Grid";
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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import "./user.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCart } from "../../action/HomePageAction";
import Carousel from "react-multi-carousel";
import { API, BASE_URL } from "../../config/config";
toast.configure();

function authHeader() {
  const user = localStorage.getItem("data");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}

const Cart = () => {
  const navigate = useNavigate();
  const CartData = useSelector(
    (state) => state.cartData.cartdata.productOfCart
  );
  const [cartData, setCartData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [count, setCount] = useState(1);
  const [count1, setCount1] = useState(1);
  const [order, setOrder] = useState([]);
  const [idid, setIdd] = useState([]);
  const [popular, setPopular] = useState([]);
  const [address, setAddressData] = useState([]);
  const [product, setproduct] = useState([]);

  const dispatch = useDispatch();
  let tempPrice = 0;
  let price = 0;
  const getCartDetail = async () => {
    const id = localStorage.getItem("localId");
    const response = await axios
      .get(`${API.viewCart}${id} `, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setCartData(response.data);
    setOrder(response.data.productOfCart[0]);
    setAllData(response.data.productOfCart);
    dispatch(getCart(response.data));
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  useEffect(() => {
    getCartDetail();
    getAddress();
    getPopularProducts();
    getProduct();
  }, []);
  const getPopularProducts = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getPopular`, {
        headers: authHeader(),
      })
      .catch((err) => {});

    setPopular(response.data.popularProduct);
  };
  const getProduct = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getProducts`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setproduct(response.data);
  };

  function increaseQuantityy(id) {
    product.filter((idd) => (id == idd._id ? setIdd(idd._id) : ""));
    product.filter((idd) =>
      id == idd._id ? setCount1(count1 + 1) : console.log("AAAAAA")
    );
  }
  function decreaseQuantityy(id) {
    if (count1 <= 1) {
    } else {
      setCount(count1 - 1);
    }
  }
  function cart(id, data) {
    const userId = localStorage.getItem("localId");
    const requestData = { user: userId, product: id, quantity: data };
    axios
      .post(`${BASE_URL}/api/addTocart`, requestData, {
        headers: authHeader(),
      })
      .then((response) =>
        response.status == "200"
          ? toast.success("Product added successfully") &&
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          : toast.warn("Something went wrong..")
      );
  }

  const getAddress = async () => {
    const id = localStorage.getItem("localId");
    const response = await axios
      .get(`${API.locationDetails}${id} `, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setAddressData(response.data.accountInfo);
  };
  const handleDelete = (data, id) => {
    axios
      .delete(`${API.deleteCartItem}`, {
        headers: authHeader(),
        data: {
          cartid: data,
          product: id,
        },
      })
      .then((response) =>
        response.status === 200
          ? (window.location = "/cart")
          : toast.warn("Something went wrong..")
      );
  };

  function increaseQuantity(id, data, countt) {
    const userId = localStorage.getItem("localId");
    const requestData = { user: userId, product: id, quantity: data + countt };
    setCount(count + 1);
    axios
      .post(`${BASE_URL}/api/addTocart`, requestData, {
        headers: authHeader(),
      })
      .then((response) =>
        response.status === 200
          ? (window.location = "/cart")
          : toast.warn("Something went wrong..")
      );
  }

  function handleData() {
    navigate("/checkout", {
      state: {
        total: price,
      },
    });
  }

  let countVar = 0;
  function decreaseQuantity(id, data, counte) {
    if (data <= 1) {
      toast.warn("Something went wrong..");
    } else {
      countVar = countVar + counte;
      if (data < countVar) {
        toast.warn("Something went wrong..");
      } else {
        const userId = localStorage.getItem("localId");
        const requestData = {
          user: userId,
          product: id,
          quantity: data - countVar,
        };
        axios
          .post(`${BASE_URL}/api/addTocart`, requestData, {
            headers: authHeader(),
          })
          .then((response) =>
            response.status === 200
              ? getCartDetail()
              : toast.warn("Something went wrong..")
          );
      }
    }
  }

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
                  Cart
                </h2>
              </a>
              <Grid
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
                              ((tempPrice =
                                item.product.offerPrice !== 0
                                  ? item.product.offerPrice * item.quantity
                                  : item.product.price * item.quantity),
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
                            <p className="pname"> {item.product.name} </p>
                            &emsp; &emsp; &emsp; &emsp;
                            <div style={{ display: "inline-flex" }}>
                              <div className="borderCart2">
                                &nbsp;
                                {item.quantity === "1" ? (
                                  <button
                                    disabled
                                    className="buttIcon"
                                    onClick={() =>
                                      decreaseQuantity(
                                        item.product._id,
                                        item.quantity,
                                        count
                                      )
                                    }
                                  >
                                    <RemoveIcon style={{ fontSize: "30px" }} />
                                  </button>
                                ) : (
                                  <button
                                    className="buttIcon"
                                    onClick={() =>
                                      decreaseQuantity(
                                        item.product._id,
                                        item.quantity,
                                        count
                                      )
                                    }
                                  >
                                    <RemoveIcon style={{ fontSize: "30px" }} />
                                  </button>
                                )}
                                &emsp; &emsp;
                                <span style={{ fontSize: "23px" }} className="">
                                  {item.quantity}
                                </span>
                                &emsp; &emsp;
                                <button
                                  className="buttIcon"
                                  onClick={() =>
                                    increaseQuantity(
                                      item.product._id,
                                      item.quantity,
                                      count
                                    )
                                  }
                                >
                                  <AddIcon style={{ fontSize: "30px" }} />
                                </button>
                                &nbsp;
                              </div>
                            </div>
                            &emsp; &emsp; &emsp; &emsp;
                            <div>
                              <p className="pname"> price </p>
                              <p className="pname">
                                {" "}
                                $
                                {item.product.offerPrice !== 0
                                  ? item.product.offerPrice
                                  : item.product.price}
                              </p>
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
                ))}

                {price === 0 ? (
                  <Grid item xs={16}>
                    <div
                      style={{ padding: "15px", margin: "0 auto" }}
                      className=""
                    >
                      <h3 style={{ textAlign: "center" }}>
                        Your cart is empty!
                      </h3>
                      <br />
                      <p style={{ textAlign: "center" }}>Add item to it now.</p>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <a className="checkoutLink" href="/">
                          <button type="submit" className="cartCheckout">
                            Shop now
                          </button>
                        </a>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={5}>
                    <div className="cartSdiv">
                      <h3 style={{ textAlign: "center" }}> Order Summary </h3>
                      <br />
                      <br />
                      <br />
                      <div style={{ display: "inline-flex" }}>
                        <p className="pLeft"> Sub Total </p> &emsp; &emsp;
                        <p className="pRight"> $ {price} </p>
                      </div>
                      <div style={{ display: "inline-flex" }}>
                        <p className="pLeft"> Delivery Fee </p>
                        <p className="pRight"> $00 </p>
                      </div>
                      <hr style={{ color: "rgb(70 169 2)" }} />
                      <div style={{ display: "inline-flex" }}>
                        <p className="pLeft"> Total </p> &emsp; &emsp; &emsp;
                        &emsp; &nbsp; <p className="pRight"> ${price} </p>
                      </div>
                      <br />
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <button
                          onClick={() => handleData()}
                          type="submit"
                          className="cartCheckout"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </Grid>
                )}
              </Grid>
              <br />
              <br />
              <br />
              <Grid
                container
                spacing={4}
                columns={16}
                className="bordercsscart"
              >
                {popular.length === 0 ? (
                  ""
                ) : (
                  <Grid
                    item
                    xs={16}
                    className="bordercss  sliderClass sliderClass2"
                  >
                    {" "}
                    <h2>
                      <b>Product you may like</b>
                    </h2>
                    <Carousel
                      swipeable={false}
                      draggable={false}
                      responsive={responsive}
                      infinite={true}
                      autoPlay={false}
                      keyBoardControl={true}
                      customTransition="all .5"
                      transitionDuration={500}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                    >
                      {popular &&
                        popular.length &&
                        popular.map((data) => (
                          <div className="row1">
                            <div
                              style={{ background: "#f6f6f6" }}
                              className="column1"
                            >
                              <a href={`/productDetail/${data._id}`}>
                                <img
                                  src={`${BASE_URL}/${data.image}`}
                                  style={{ width: "315px", height: "213px" }}
                                ></img>
                              </a>
                            
                              <p className="catfooterr">{data.name}</p>
                              <p className="sellfooterr">${data.price}</p>
                              <div style={{ display: "inline-flex" }}>
                                <div className="borderrr" id={data._id}>
                                  <button
                                    className="buttIcon"
                                    onClick={() => decreaseQuantityy(data._id)}
                                  >
                                    <RemoveIcon
                                      style={{
                                        fontSize: "30px",
                                        marginTop: "-12px",
                                      }}
                                    />
                                  </button>
                                  &emsp;&nbsp; &emsp;&nbsp;
                                  <span
                                    style={{
                                      fontSize: "26px",
                                    }}
                                    className=""
                                  >
                                    {data._id === idid ? count1 : "1"}
                                  </span>
                                  &emsp;&nbsp;&emsp;&nbsp;
                                  <button
                                    className="buttIcon"
                                    onClick={() => increaseQuantityy(data._id)}
                                  >
                                    <AddIcon
                                      style={{
                                        fontSize: "30px",
                                        marginTop: "-12px",
                                      }}
                                    />
                                  </button>
                                </div>
                                &emsp; &emsp; &emsp;
                                <img
                                  onClick={() => cart(data._id, count1)}
                                  src="/Cart.png"
                                  style={{ width: "40px", cursor: "pointer" }}
                                ></img>
                              </div>
                            </div>
                          </div>
                        ))}
                    </Carousel>
                  </Grid>
                )}
              </Grid>
            </div>
          </div>
        </div>
        <Footerr />
      </body>
    </>
  );
};

export default Cart;
