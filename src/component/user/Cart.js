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

toast.configure();

function authHeader() {
  const user = localStorage.getItem("data");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Cart = () => {
  const CartData = useSelector(
    (state) => state.cartData.cartdata.productOfCart
  );
  const [cartData, setCartData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [count, setCount] = useState(0);

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
    // console.log("@@@@@@@@@@@@@@@response", response);
    setCartData(response.data);
    setAllData(response.data.productOfCart);
    dispatch(getCart(response.data));
  };

  useEffect(() => {
    getCartDetail();
  }, []);
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
        response.status == "200"
          ? (window.location = "/cart")
          : toast.warn("Something went wrong..")
      );
  };
  function increaseQuantity(id) {
    console.log("@@@@@@@@@@@@@@@@", id);
    // const divId = document.getElementById(id);
    // divId.textContent = count;
    if (id != null) {
      setCount(count + 1);
    } else {
    }
    // product.filter((idd) => (id == idd._id ? setIdd(idd._id) : ""));
    // product.filter((idd) =>
    //   id == idd._id ? setCount(count + 1) : console.log("AAAAAA")
    // );
  }
  // console.log("count", count);
  function decreaseQuantity(id) {
    if (count <= 1) {
    } else {
      setCount(count - 1);
    }
  }
  // const scores = [10, 20];
  // const totalScores = scores.reduce(
  //   (previousScore, currentScore, index) => previousScore + currentScore,
  //   0
  // );
  // console.log("@@@@@@@@@@@@@@@@@@totalScores", totalScores);
  // console.log("tempPricetempPrice!!!!!!!!!!!!!!", tempPrice);
  // console.log("%%%%%%%%%%%%%%%price", price);

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
                                  onClick={() =>
                                    decreaseQuantity(item.product._id)
                                  }
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
                                  onClick={() =>
                                    increaseQuantity(item.product._id)
                                  }
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
                ))}
                {/* {console.log("@@@@@@@@@@@@@@@@@", price)} */}
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
                      <h3 style={{ textAlign: "center" }}>Order Summary</h3>
                      <br />
                      <br />
                      <br />
                      <div style={{ display: "inline-flex" }}>
                        <p className="pLeft">Sub Total</p> &emsp; &emsp;
                        <p className="pRight">${price}</p>
                      </div>
                      <div style={{ display: "inline-flex" }}>
                        <p className="pLeft">Delivery Fee</p>
                        <p className="pRight">$00</p>
                      </div>
                      <hr style={{ color: "rgb(70 169 2)" }} />
                      <div style={{ display: "inline-flex" }}>
                        <p className="pLeft">Total</p> &emsp; &emsp; &emsp;
                        &emsp;&nbsp;
                        <p className="pRight">${price}</p>
                      </div>
                      <br />
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <a className="checkoutLink" href="/checkout">
                          <button type="submit" className="cartCheckout">
                            Checkout
                          </button>
                        </a>
                      </div>
                    </div>
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
