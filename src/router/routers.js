import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { history } from "../common/history";
import Dashboard from "../component/admin/Dashboard";
import Login from "../component/Login";
import Register from "../component/Register";
import Reset from "../component/Reset";
import ResetPassword from "../component/ResetPassword";
import UserList from "../component/admin/Userlist";
import ProductDetail from "../component/admin/ProductDetail";
import CategoryDetail from "../component/admin/CategoryDetail";
import AddUser from "../component/admin/AddUser";
import AddCategory from "../component/admin/AddCategory";
import AddProduct from "../component/admin/AddProduct";
import UserDashboard from "../component/user/UserDashboard";
import Header from "../component/admin/Header";
import Banner from "../component/admin/BannerForm";
import Newsletter from "../component/admin/Newsletter";
import Footer from "../component/admin/Footer";
import BannerData from "../component/admin/Banner";
import NewsLetterForm from "../component/admin/NewsLetterForm";
import BannerForm from "../component/admin/BannerForm";
import Profile from "../component/admin/profile";
import HeaderForm from "../component/admin/HeaderForm";
import FooterForm from "../component/admin/FooterForm";
import OrderDetail from "../component/admin/OrderDetail";
import AppBar from "../component/user/AppBar";
import Home from "../component/user/Home";
import Logout from "../common/Logout";
import Footerr from "../component/user/Footerr";
import ProductPage from "../component/user/ProductPage";
import UserSideBar from "../component/user/UserSideBar";
import ProductDetails from "../component/user/ProductDetails";
import Cart from "../component/user/Cart";
import Checkout from "../component/user/Checkout";
import AllProduct from "../component/user/AllProduct";
import NotFoundPage from "../common/NotFoundPage";
import PaymentSuccess from "../component/user/PaymentSuccess";
import PaymentFailed from "../component/user/PaymentFailed";
import OrderPage from "../component/user/OrderPage";
import AddProductOffer from "../component/admin/AddProductOffer";
import ProductOfferDetail from "../component/admin/ProductOfferDetail";
import ViewOrderDetail from "../component/user/ViewOrderDetail";

class Routers extends Component {
  state = {
    token: localStorage.getItem("data"),
    role: localStorage.getItem("role"),
  };
  componentDidMount() {
    // const notFoundd = localStorage.getItem("data");
    // this.setState({ token: notFoundd });
  }
  render() {
    return (
      <>
        {/* {this.state.token != null ? ( */}
        {this.state.token != null ? (
          <Routes>
            {this.state.role == "true" ? (
              <Route history={history} exact path="/" element={<Dashboard />} />
            ) : (
              <Route history={history} exact path="/" element={<Home />} />
            )}

            <Route
              history={history}
              exact
              path="/logout"
              element={<Logout />}
            />

            <Route
              history={history}
              exact
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              history={history}
              exact
              path="/userlists"
              element={<UserList />}
            />
            <Route
              history={history}
              exact
              path="/productDetails"
              element={<ProductDetail />}
            />
            <Route
              history={history}
              exact
              path="/addUser"
              element={<AddUser />}
            />
            <Route
              history={history}
              exact
              path="/categoryDetails"
              element={<CategoryDetail />}
            />
            <Route
              history={history}
              exact
              path="/addCat"
              element={<AddCategory />}
            />
            <Route
              history={history}
              exact
              path="/addPro"
              element={<AddProduct />}
            />
            <Route
              history={history}
              exact
              path="/userDashboard"
              element={<UserDashboard />}
            />
            <Route
              history={history}
              exact
              path="/header"
              element={<Header />}
            />
            <Route
              history={history}
              exact
              path="/banner"
              element={<Banner />}
            />
            <Route
              history={history}
              exact
              path="/bannerform"
              element={<BannerForm />}
            />

            <Route
              history={history}
              exact
              path="/newsletter"
              element={<Newsletter />}
            />
            <Route
              history={history}
              exact
              path="/newsLetterform"
              element={<NewsLetterForm />}
            />

            <Route
              history={history}
              exact
              path="/footer"
              element={<Footer />}
            />
            <Route
              history={history}
              exact
              path="/bannerList"
              element={<BannerData />}
            />
            <Route
              history={history}
              exact
              path="/profile"
              element={<Profile />}
            />
            <Route
              history={history}
              exact
              path="/headerForm"
              element={<HeaderForm />}
            />
            <Route
              history={history}
              exact
              path="/footerForm"
              element={<FooterForm />}
            />
            <Route
              history={history}
              exact
              path="/orderDetail"
              element={<OrderDetail />}
            />
            <Route
              history={history}
              exact
              path="/appBar"
              element={<AppBar />}
            />
            <Route
              history={history}
              exact
              path="/footer"
              element={<Footerr />}
            />

            <Route
              history={history}
              exact
              path="/productPage/:id"
              element={<ProductPage />}
            />
            <Route
              history={history}
              exact
              path="/userSideBar"
              element={<UserSideBar />}
            />
            <Route
              history={history}
              exact
              path="/productDetail/:id"
              element={<ProductDetails />}
            />
            <Route history={history} exact path="/cart" element={<Cart />} />
            <Route
              history={history}
              exact
              path="/checkout/:orderid"
              element={<Checkout />}
            />
            <Route
              history={history}
              exact
              path="/allProduct"
              element={<AllProduct />}
            />
            <Route
              history={history}
              exact
              path="/paymentSuccess"
              element={<PaymentSuccess />}
            />
            <Route
              history={history}
              exact
              path="/paymentFailed"
              element={<PaymentFailed />}
            />
            <Route
              history={history}
              exact
              path="*"
              element={<NotFoundPage />}
            />
            <Route
              history={history}
              exact
              path="/order"
              element={<OrderPage />}
            />
            <Route
              history={history}
              exact
              path="/offerDetail"
              element={<ProductOfferDetail />}
            />

            <Route
              history={history}
              exact
              path="/viewOrder/:id"
              element={<ViewOrderDetail />}
            />
            <Route
              history={history}
              exact
              path="/productOffer"
              element={<AddProductOffer />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route history={history} exact path="/login" element={<Login />} />
            <Route
              history={history}
              exact
              path="/footer"
              element={<Footer />}
            />
            <Route
              history={history}
              exact
              path="/register"
              element={<Register />}
            />
            <Route
              history={history}
              exact
              path="/reset"
              element={<ResetPassword />}
            />
            <Route
              history={history}
              exact
              path="/resetEmail"
              element={<Reset />}
            />
            <Route history={history} exact path="/" element={<Home />} />
            <Route
              history={history}
              exact
              path="/logout"
              element={<Logout />}
            />

            <Route
              history={history}
              exact
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        )}
      </>
    );
  }
}

export default Routers;
