import React, { Component } from "react";
import { getContacts, deleteContactUsData } from "../../action/index";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import "../../style/css/sidebar.css";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class ContactUsDetails extends Component {
  state = {
    contactData: [],
  };
  bgColorr = "";

  componentDidMount() {
    this.getContactDetail();
  }
  getContactDetail() {
    this.props.getContacts((res) => {
      this.setState({ contactData: res.data.contactData });
    });
  }
  handleDelete(id) {
    this.props.deleteContactUsData(id, (res) => {
      toast.success("User data delete successfully");
      this.getContactDetail();
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
              <span className="heading ml-2 ">ContactUs Lists</span>
            </div>
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">UserId</th>
                  <th scope="col">Name</th>
                  <th scope="col">email</th>
                  <th scope="col">Message</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.contactData.map((item) => (
                  <>
                    <tr key={"gh"}>
                      <td>{""}</td>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.message}</td>
                      <td>
                        <button
                          className="btn bg-transparent"
                          onClick={() => this.handleDelete(item._id)}
                        >
                          <i className="fa fa-trash text-danger ml-2"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
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
export default connect(mapStateToProps, { getContacts, deleteContactUsData })(
  ContactUsDetails
);
