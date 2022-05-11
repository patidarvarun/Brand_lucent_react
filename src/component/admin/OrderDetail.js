import React, { Component } from "react";
import //   getAllBanner,
"../../action/index";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import "../../style/css/sidebar.css";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class ProductDetail extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 700,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };

    return (
      <div className="container-scroller">
        <TopNav />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel m-1">ok</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  // const { auth, profile } = store;
  return {};
};
export default connect(mapStateToProps, {})(ProductDetail);

// import React from 'react'

// function OrderDetail() {
//   const banner = useSelector((state) => state);

//   return (
//     <div>OrderDetail</div>
//   )
// }

// export default OrderDetail
