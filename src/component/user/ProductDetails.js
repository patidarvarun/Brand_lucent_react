import * as React from "react";
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
import Carousel from "react-multi-carousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "@mui/material";
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
  const [count1, setCount1] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [popular, setPopular] = useState([]);
  const [order, setOrder] = useState([]);
  const [idid, setIdd] = useState([]);
  const [product, setproduct] = useState([]);

  let price = 0;
  let tempPrice = 0;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
  const getProduct = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getProducts`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setproduct(response.data);
  };

  const getPopularProducts = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getPopular`, {
        headers: authHeader(),
      })
      .catch((err) => {});

    setPopular(response.data.popularProduct);
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
      setCount1(count1 - 1);
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
          ? toast.success("Product added successfully")
          : toast.warn("Something went wrong..")
      );
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000)
  }
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
    getPopularProducts();
    getProduct();
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
            {/* <UserSideBar /> */}
            <div className="main-panell">
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
                    <h2 style={{ marginTop: "3em" }}>
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
                                  style={{ width: "300px", height: "213px" }}
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

export default ProductDetails;
