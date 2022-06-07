import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "./AppBar";
import Checkbox from "@mui/material/Checkbox";
import { useLocation } from "react-router";
import "../../style/vendors/feather/feather.css";
import "../../style/vendors/ti-icons/css/themify-icons.css";
import "../../style/vendors/css/vendor.bundle.base.css";
import "../../style/vendors/datatables.net-bs4/dataTables.bootstrap4.css";
import "../../style/vendors/ti-icons/css/themify-icons.css";
import "../../style/js/select.dataTables.min.css";
import "../../style/css/vertical-layout-light/style.css";
import "../../style/images/favicon.png";
import "../../style/css/sidebar.css";
import Footerr from "./Footerr";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../action/HomePageAction";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { BASE_URL } from "../../config/config";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(2),
  textAlign: "left",
  color: "black",
}));
const ProductPage = () => {
  const ProducttData = useSelector((state) => state.allProduct.ProdData);
  const location = useLocation();
  // const catData = useSelector((state) => state.allCat.catdata);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [idid, setIdd] = useState([]);
  const [cat, setCat] = useState([]);
  const [catIdd, setCatIdd] = useState("");
  const [visible, setVisible] = useState(6);
  const [isdefaultAllChecked, setIsdefaultAllChecked] = useState(false);
  let name = [];

  const loadMore = () => {
    setVisible(visible + 3);
  };

  const getProduct = async (id) => {
    const response = await axios
      .get(
        `${BASE_URL}/api/getProductBycategory/${id}
        `,
        {
          headers: authHeader(),
        }
      )
      .catch((err) => {});
    setProduct(response.data);
    dispatch(getProductById(response.data));
  };

  const getCategories = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getCategory`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setCat(response.data);
  };

  const getallproduct = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getProducts`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    // setAllProd(response.data);
    setProduct(response.data);
  };
  useEffect(() => {
    setCatIdd(location.state.catId);
    getProduct(location.state.catId);
    getCategories();
  }, []);
  {
    product.map((aa) =>
      cat.filter((bb) => (aa.cat_id == bb._id ? name.push(bb.name) : ""))
    );
  }
  const handleChange = (item) => {
    setCatIdd(item._id);
    setIsdefaultAllChecked(false);
    getProduct(item._id);
    // window.location.replace("/productPage/" + id);
  };
  const handleChange1 = () => {
    setCatIdd("");
    setIsdefaultAllChecked(true);
    getallproduct();
  };
  function increaseQuantity(id) {
    product.filter((idd) => (id == idd._id ? setIdd(idd._id) : ""));
    product.filter((idd) =>
      id == idd._id ? setCount(count + 1) : console.log("BBBB")
    );
  }
  function decreaseQuantity(id) {
    if (count <= 1) {
    } else {
      setCount(count - 1);
    }
  }
  function cart(id, data) {
    // console.log("#############datacart", data);
    // console.log("ADD TO CART", count);
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
  }
  return (
    <>
      <body>
        <div className="container-scroller">
          <AppBar />
          <div className="container-fluid page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <div className="sidebarColor">
                <h2>Category</h2>
                <Checkbox
                  value="all"
                  checked={isdefaultAllChecked}
                  onClick={() => handleChange1()}
                  inputProps={{ "aria-label": "controlled" }}
                />
                All
                {cat.map((items) => (
                  <div>
                    <Checkbox
                      checked={items._id === catIdd ? true : false}
                      onClick={() => handleChange(items)}
                      inputProps={{ "aria-label": "controlled" }}
                    />

                    {items.name}
                  </div>
                ))}
              </div>
            </nav>
            <div className="main-panel">
              <div className="content-wrapper">
                <Box sx={{ flexGrow: 1 }}>
                  {name && name.length === 0 ? (
                    <h1 className="homeHeading">Home{name[0]}</h1>
                  ) : (
                    <h1 className="homeHeading">Home/{name[0]}</h1>
                  )}
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {product.slice(0, visible).map((item) => (
                      <Grid item xs={2} sm={4} md={4}>
                        <Item>
                          <a href={`/productDetail/${item._id}`}>
                            <img
                              style={{ width: "20em", height: "16em" }}
                              src={`${BASE_URL}/${item.image}`}
                              alt={item.title}
                              loading="lazy"
                            ></img>
                          </a>
                          <p className="productHead">{item.name}</p>
                          <p className="productHead">${item.price}</p>
                          <div style={{ display: "inline-flex" }}>
                            <div className="borderr" id={item._id}>
                              <button
                                className="buttIcon"
                                onClick={() => decreaseQuantity(item._id)}
                              >
                                <RemoveIcon style={{ fontSize: "30px" }} />
                              </button>
                              &emsp;&nbsp; &emsp;&nbsp;
                              <span style={{ fontSize: "30px" }} className="">
                                {item._id == idid ? count : "1"}
                              </span>
                              &emsp;&nbsp;&emsp;&nbsp;
                              <button
                                className="buttIcon"
                                onClick={() => increaseQuantity(item._id)}
                              >
                                <AddIcon style={{ fontSize: "30px" }} />
                              </button>
                            </div>
                            &emsp; &emsp; &emsp;
                            <img
                              onClick={() => cart(item._id, count)}
                              src="/Cart.png"
                              style={{ width: "40px", cursor: "pointer" }}
                            ></img>
                          </div>
                        </Item>
                      </Grid>
                    ))}
                  </Grid>
                  <div className="divAlignment">
                    {visible < product.length && (
                      <button className="loadmore" onClick={loadMore}>
                        Load More
                      </button>
                    )}
                  </div>
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

export default ProductPage;
