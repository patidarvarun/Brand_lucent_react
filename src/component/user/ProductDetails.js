import * as React from "react";
import UserSideBar from "./UserSideBar";
import { useEffect, useState } from "react";
import AppBar from "./AppBar";
import Footerr from "./Footerr";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
import { experimentalStyled as styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../action/HomePageAction";
import Paper from "@mui/material/Paper";
import { API, BASE_URL } from "../../config/config";
import "./user.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "@mui/material";
import ProductPage from "./ProductPage";
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
  textAlign: "center",
  width: 400,
  bgcolor: "white",
  pt: 2,
  px: 4,
  pb: 3,
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductDetails = () => {
  const navigate = useNavigate();
  const ProductDetail = useSelector(
    (state) => state.allProductDetail.ProductDetails.product
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [count, setCount] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = useState([]);
  let price = 0;
  let tempPrice = 0;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getProductDetail = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/productDeatils?productid=${id} `, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setProductDetails(response.data.product);
    dispatch(getProductDetails(response.data));
    handleCount();
  };

  useEffect(() => {
    getProductDetail();
    getCartDetail();
  }, []);

  function increaseQuantity(id) {
    setCount(count + 1);
  }
  function decreaseQuantity(id) {
    if (count <= 1) {
    } else {
      setCount(count - 1);
    }
  }

  function handleCount() {
    axios
      .post(`${BASE_URL}/api/addvisit?productid=${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status == 200) {
        }
      });
  }

  const getCartDetail = async () => {
    const id = localStorage.getItem("localId");
    const response = await axios
      .get(`${API.viewCart}${id} `, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setOrder(response.data.productOfCart[0]);
  };

  function handleData() {
    const userId = localStorage.getItem("localId");
    let productData = [];
    productData.push({
      product: productDetails._id,
      quantity: count,
    });
    const requestOrderData = {
      userId: userId,
      cartid: order._id,
      products: productData,
      contact: "987654321",
      amount: {
        total: price,
        currency: "USD",
      },
    };
    navigate("/checkout", {
      state: {
        product: requestOrderData,
      },
    });
    // axios
    //   .post(`${BASE_URL}/api/saveOrder`, requestOrderData, {
    //     headers: authHeader(),
    //   })
    //   .then((response) => {
    //     if (response.status == 200) {
    //       window.location = `/checkout/${response.data.orderdData._id}`;
    //     }
    //   });
  }

  function addToCart(id, data) {
    const userId = localStorage.getItem("localId");
    const requestData = { user: userId, product: id, quantity: data };
    axios
      .post(`${BASE_URL}/api/addTocart`, requestData, {
        headers: authHeader(),
      })
      .then((response) =>
        response.status == "200"
          ? handleOpen()
          : toast.warn("Something went wrong..")
      );
  }
  return (
    <>
      <body>
        <div className="container-scroller">
          <AppBar />
          <div className="container-fluid page-body-wrapper">
            <UserSideBar />
            <div className="main-panel">
              <div className="content-wrapper">
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <div style={{ display: "none" }}>
                      {
                        ((tempPrice = count * productDetails.price),
                        (price = price + tempPrice))
                      }
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <img
                        style={{
                          width: "20em",
                          height: "20em",
                          borderRadius: "7px",
                        }}
                        src={`${BASE_URL}/${productDetails.image}`}
                        alt={productDetails.name}
                      ></img>
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <div style={{ textAlign: "left" }}>
                      <h3>{productDetails.name}</h3>
                      <p className="cartHead">Price</p>
                      <h3>${productDetails.price}</h3>
                      <p>{productDetails.description}</p>
                      <p className="cartHead">Quantity</p>
                      <div style={{ display: "inline-flex" }}>
                        <div className="borderCart">
                          <button
                            className="buttIcon"
                            onClick={() => decreaseQuantity(productDetails._id)}
                          >
                            <RemoveIcon style={{ fontSize: "30px" }} />
                          </button>
                          &emsp;&nbsp;
                          <span style={{ fontSize: "23px" }} className="">
                            {count}
                          </span>
                          &emsp;&nbsp;
                          <button
                            className="buttIcon"
                            onClick={() => increaseQuantity(productDetails._id)}
                          >
                            <AddIcon style={{ fontSize: "30px" }} />
                          </button>
                        </div>
                      </div>
                      <br />
                      <br />
                      &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
                      <button
                        type="submit"
                        onClick={() => addToCart(productDetails._id, count)}
                        className="detailPro"
                      >
                        Add to Cart
                      </button>
                    </div>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box sx={{ ...style, width: 580 }}>
                        <button
                          className="cartClose"
                          onClick={() => handleClose()}
                        >
                          X
                        </button>
                        <h4>This item was added to your Cart</h4>
                        <br />
                        <img
                          style={{
                            width: "17em",
                            height: "17em",
                            borderRadius: "7px",
                          }}
                          src={`${BASE_URL}/${productDetails.image}`}
                          alt={productDetails.name}
                        ></img>
                        <br />
                        <br />

                        <h2>{productDetails.name}</h2>
                        <p className="cartPrice">${productDetails.price}</p>
                        <button
                          onClick={() => handleData()}
                          type="submit"
                          className="checkout"
                        >
                          Checkout
                        </button>
                        <br />
                        <br />

                        <a className="cartLink" href="/cart">
                          View Cart
                        </a>
                      </Box>
                    </Modal>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <Footerr />
      </body>
    </>
  );
};

export default ProductDetails;
