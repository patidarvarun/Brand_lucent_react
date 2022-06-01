import { Box, Container, Grid, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../config/config";
import { Link } from "react-router-dom";
import {
  getCategory,
  getFooter,
  getNewsletter,
  getSellingProduct,
  setBanner,
} from "../../action/HomePageAction";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AppBar from "./AppBar";
import "./user.css";
import Footerr from "./Footerr";
import ProductPage from "./ProductPage";

function authHeader() {
  const user = localStorage.getItem("data");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}
function Home(props) {
  const banner = useSelector((state) => state.allBanners.banData);
  const catData = useSelector((state) => state.allCat.catdata);
  const sellProduct = useSelector((state) => state.allSelling.sellingData);
  const newsletterr = useSelector((state) => state.allNews.newsData);
  const getFootData = useSelector(
    (state) => state.allFooter.FootData.footerData
  );
  const [newDataa, setNewsDataa] = useState([]);
  const [sellingProduct, setSellingProduct] = useState([]);
  const [popular, setPopular] = useState([]);
  const [offerDataa, setOfferDataa] = useState([]);
  const [footDataa, setFootDataa] = useState([]);
  const [id1, setIdd] = useState([]);

  const dispatch = useDispatch();

  // console.log("$$$$$$$$$$$$$offerDataa", sellProduct);

  const getAllBanner = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getBanner`)
      .catch((err) => {});
    dispatch(setBanner(response.data.bannerData));
  };

  const getCategories = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getCategory`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    dispatch(getCategory(response.data));
  };

  const getSellingProducts = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getBestselling`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setSellingProduct(response.data.bestSelling);
    dispatch(getSellingProduct(response.data));
  };
  const getPopularProducts = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getPopular`, {
        headers: authHeader(),
      })
      .catch((err) => {});

    setPopular(response.data.popularProduct);
  };
  const getNewsLetter = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getNewsletter`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    // console.log("@@@@@@@@@@@@@@@", response.data.NewsLetterData);
    setNewsDataa(response.data.NewsLetterData);
    dispatch(getNewsletter(response.data.NewsLetterData));
  };
  const getOfferDetail = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/GetProductOffer`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    // console.log("@@@@@@@@@@@@@@@response", response.data);
    setOfferDataa(response.data);
  };
  const getAllFooter = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getFooter`)
      .catch((err) => {});
    // console.log("%%%%%%%%%%%%%%%%%%", response);
    setFootDataa(response.data.footerData);
    dispatch(getFooter(response.data));
  };
  const token = localStorage.getItem("data");
  useEffect(() => {
    getAllBanner();
    getCategories();
    getSellingProducts();
    getNewsLetter();
    getAllFooter();
    getOfferDetail();
    getPopularProducts();
  }, []);

  function greetUser(idd) {
    // console.log("Hi there, user!", idd);
    setIdd(idd);
    <ProductPage id={id1} />;
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <AppBar />
      {token != null ? (
        <div className="main-panel1">
          <div className="content-wrapper1">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={12} className="bordercss">
                  <h2>Categories</h2>
                  {catData.map((data) => (
                    // console.log("****************",data)
                    <div className="row1">
                      <div
                        style={{ background: "#f6f6f6" }}
                        className="column1"
                      >
                        <a href={`/productPage/${data._id}`}>
                          <img
                            onClick={() => greetUser(data._id)}
                            src={`${BASE_URL}/${data.image}`}
                            style={{ width: "205px", height: "213px" }}
                          ></img>
                        </a>
                        <p className="catfooter">{data.name}</p>
                      </div>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} className="bordercss">
                  <h1>Offers</h1>
                  {offerDataa.slice(0, 4).map((data) => (
                    <div className="row1">
                      <div
                        style={{ background: "#f6f6f6" }}
                        className="column1"
                      >
                        <img
                          src={`${BASE_URL}/${data.productId.image}`}
                          style={{ width: "315px", height: "213px" }}
                        ></img>
                        <p className="catfooter">{data.productId.name}</p>
                        <p className="sellfooter">${data.discountPrice}</p>
                        <p className="sellfooter2">${data.productId.price}</p>
                      </div>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} className="bordercss">
                  <h1>Best Selling Products</h1>
                  {sellingProduct.slice(0, 4).map((data) => (
                    <div className="row1">
                      <div
                        style={{ background: "#f6f6f6" }}
                        className="column1"
                      >
                        <img
                          src={`${BASE_URL}/${data.image}`}
                          style={{ width: "315px", height: "213px" }}
                        ></img>
                        <p className="catfooter">{data.name}</p>
                        <p className="sellfooter">${data.price}</p>
                      </div>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} className="bordercss">
                  <h1>Popular Products</h1>
                  {popular.slice(0, 4).map((data) => (
                    // console.log("****************",data)
                    <div className="row1">
                      <div
                        style={{ background: "#f6f6f6" }}
                        className="column1"
                      >
                        <img
                          src={`${BASE_URL}/${data.image}`}
                          style={{ width: "315px", height: "213px" }}
                        ></img>
                        <p className="catfooter">{data.name}</p>
                        <p className="sellfooter">${data.price}</p>
                      </div>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>
            <Footerr />
          </div>
        </div>
      ) : (
        // Without Login User Side ***************************************************************************************
        <div className="main-panel1">
          <div className="content-wrapper1">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  {banner.map((data) => (
                    <div style={{ marginTop: "55px" }}>
                      <img
                        style={{
                          height: "25em",
                          width: "100%",
                        }}
                        src={`${BASE_URL}/${data.banner}`}
                      ></img>

                      <div>
                        <p className="banner">{data.title}</p>
                        <h3 className="bannerHeading">
                          {data.description.slice(0, 27)}
                        </h3>
                        <h3 className="bannerHeading1">
                          {data.description.slice(27, 80)}
                        </h3>
                        <img
                          className="imglogo"
                          src={`${BASE_URL}/${data.logo}`}
                        ></img>
                        <Link to="/register">
                          <button
                            type="submit"
                            style={{
                              background: "rgb(104, 143, 78)",
                              width: "6.3em",
                              border: "none",
                              top: "20.2em",
                              position: "absolute",
                              height: "35px",
                              left: "7em",
                            }}
                            className="btn btn-primary  "
                          >
                            Sign Up
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} className="bordercss">
                  <h2>Categories</h2>
                  {catData.map((data) => (
                    // console.log("****************",data)
                    <div className="row1">
                      <div
                        style={{ background: "#f6f6f6" }}
                        className="column1"
                      >
                        <a className="withoutLogin" href="/login">
                          <img
                            src={`${BASE_URL}/${data.image}`}
                            style={{ width: "205px", height: "213px" }}
                          ></img>
                          <p className="catfooter">{data.name}</p>
                        </a>
                      </div>
                    </div>
                  ))}
                </Grid>

                <Grid item xs={12} className="bordercss">
                  <h1>Offers</h1>
                  {offerDataa.slice(0, 4).map((data) => (
                    <div className="row1">
                      <div
                        style={{ background: "#f6f6f6" }}
                        className="column1"
                      >
                        <a className="withoutLogin" href="/login">
                          <img
                            src={`${BASE_URL}/${data.productId.image}`}
                            style={{ width: "315px", height: "213px" }}
                          ></img>
                          <p className="catfooter">{data.productId.name}</p>
                          <p className="sellfooter">${data.discountPrice}</p>
                          <p className="sellfooter2">${data.productId.price}</p>
                        </a>
                      </div>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} className="bordercss">
                  <h1>Best Selling Products</h1>
                  {sellingProduct.slice(0, 4).map((data) => (
                    <div className="row1">
                      <div
                        style={{ background: "#f6f6f6" }}
                        className="column1"
                      >
                        <a className="withoutLogin" href="/login">
                          <img
                            src={`${BASE_URL}/${data.image}`}
                            style={{ width: "315px", height: "213px" }}
                          ></img>
                          <p className="catfooter">{data.name}</p>
                          <p className="sellfooter">${data.price}</p>
                        </a>
                      </div>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} className="bordercss">
                  <h1>Popular Products</h1>
                  {popular.slice(0, 4).map((data) => (
                    // console.log("****************",data)
                    <div className="row1">
                      <div
                        style={{ background: "#f6f6f6" }}
                        className="column1"
                      >
                        <img
                          src={`${BASE_URL}/${data.image}`}
                          style={{ width: "315px", height: "213px" }}
                        ></img>
                        <p className="catfooter">{data.name}</p>
                        <p className="sellfooter">${data.price}</p>
                      </div>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  {newDataa.map((data) => (
                    <Item style={{ marginTop: "55px", height: "37em" }}>
                      <img
                        style={{
                          height: "30em",
                          width: "100%",
                        }}
                        src={`${BASE_URL}/${data.backgroundImage}`}
                      ></img>
                      <div className="newslee">
                        <h3 className="newlettercss">
                          {data.description.slice(0, 27)}
                        </h3>
                        <h3 style={{ padding: "3px" }} className="newlettercss">
                          {data.description.slice(27, 80)}
                        </h3>
                        <br />
                        <br />
                        <p className="subscribee">
                          Subscribe to get 10% Discount and Promotion
                        </p>
                        <input
                          className="newsletterinput"
                          type="text"
                          placeholder="Email address"
                        ></input>
                        &emsp;
                        <Link to="/register">
                          <button
                            type="submit"
                            style={{
                              background: "rgb(104, 143, 78)",
                              width: "6.3em",
                              border: "none",
                              height: "41px",
                            }}
                            className="btn btn-primary  "
                          >
                            Sign Up
                          </button>
                        </Link>
                      </div>
                    </Item>
                  ))}
                </Grid>
              </Grid>
            </Box>
            <Footerr />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
