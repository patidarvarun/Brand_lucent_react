import React, { Component } from "react";
import { getOrders } from "../../action/index";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import "../../style/css/sidebar.css";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class OrderDetail extends Component {
  state = {
    orderData: [],
  };
  bgColorr = "";

  componentDidMount() {
    this.getOrderDetail();
  }
  getOrderDetail() {
    this.props.getOrders((res) => {
      this.setState({ orderData: res.data.orders });
    });
  }

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
          <div className="main-panel m-1">
            <div className="row mt-3 mb-3 rowdiv">
              <span className="heading ml-2 ">Orders Lists</span>
            </div>
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">OrderId</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">PaymentMethod</th>
                  <th scope="col">Phone No.</th>
                  <th scope="col">Total Fee</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orderData.map((item) =>
                  item.products.map((data) => (
                    <>
                      <tr
                        style={{
                          backgroundColor:
                            item.status == "close"
                              ? "rgb(157 212 121)"
                              : "#ef9292",
                        }}
                        key={"gh"}
                      >
                        <td>{""}</td>
                        <td>{item._id}</td>
                        <td>{data.product.name}</td>
                        <td>{data.quantity}</td>
                        <td>{data.product.price}</td>
                        <td>{item.paymentMethod}</td>
                        <td>{item.contact}</td>
                        <td>{item.amount.total}</td>
                        <td>{item.shipping_address.line1}</td>
                        <td>{item.status}</td>
                      </tr>
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  // const { auth, profile } = store;
  return {};
};
export default connect(mapStateToProps, { getOrders })(OrderDetail);
