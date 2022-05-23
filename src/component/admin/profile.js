import React, { Component } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { getUserDetail, updateUser } from "../../action/index";
import { connect } from "react-redux";
import { Fade, Modal, Backdrop, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/css/sidebar.css";
import "../../style/css/profile.css";
toast.configure();

class Profile extends Component {
  state = {
    openmodel: false,
    userdatabyid: [],
    name: "",
    email: "",
    phone: "",
  };

  componentDidMount() {
    this.handleGetUser(localStorage.getItem("localId"));
  }

  handleGetUser(id) {
    this.props.getUserDetail(id, (res) => {
      this.setState({ userdatabyid: res.data.user });
    });
  }

  openPopup = () => {
    this.setState({ openmodel: true });
  };

  handleProfileUpdate = (e) => {
    e.preventDefault();
    const { name, email, phone, userdatabyid } = this.state;
    const requestData = {
      _id: userdatabyid._id,
      name: name === "" ? userdatabyid.name : name,
      email: email === "" ? userdatabyid.email : email,
      phone: phone === "" ? userdatabyid.phone.toString() : phone.toString(),
      status: userdatabyid.status === "pending" ? "pending" : "approved",
    };
    this.props.updateUser(requestData, (res) => {
      if (res.status === 200) {
        toast.success("Profile Updated");
        window.location = "/profile";
        this.handleGetUser(localStorage.getItem("localId"));
      } else if (res.status === 400) {
        toast.error(res.data.message);
      }
    });
  };

  handleClose = () => this.setState({ openmodel: false });

  render() {
    const { userdatabyid, openmodel } = this.state;
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      borderRadius: "15px",
      p: 4,
    };
    return (
      <div className="container-scroller">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openmodel}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openmodel}>
            <Box sx={style}>
              <form class="mui-form" onSubmit={this.handleProfileUpdate}>
                <legend className="text-center">Edit User</legend>
                <div class="mui-textfield">
                  <input
                    type="text"
                    placeholder="Name"
                    className="inputcss"
                    defaultValue={userdatabyid.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>
                <div class="mui-textfield">
                  <input
                    type="text"
                    placeholder="Contact"
                    className="inputcss"
                    defaultValue={userdatabyid.phone}
                    onChange={(e) => this.setState({ phone: e.target.value })}
                  />
                </div>
                <div class="mui-textfield">
                  <input
                    type="text"
                    placeholder="Email"
                    className="inputcss"
                    defaultValue={userdatabyid.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="btndesign">
                  <button type="submit" class="btn btn-outline-success mr-5">
                    <i class="fa fa-refresh"></i> Update
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={this.handleClose}
                  >
                    <i class="fa fa-close"></i> Close
                  </button>
                </div>
              </form>
            </Box>
          </Fade>
        </Modal>
        <TopNav />

        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="centeralgin main-panel m-1 ">
            <div className="row mt-3 mb-3 rowdiv">
              <span className="heading ml-2 ">Your Profile Card</span>
            </div>

            <div class="card cardcustom">
              <img
                src={require("../../style/images/profile.jpg")}
                alt="John"
                style={{ width: "100%" }}
              />
              <div className="divdesign">
                <span className="spantext">Name : </span>
                <span className="title">{userdatabyid.name} </span>
                <br />
                <span className="spantext">Contact : </span>
                <span className="title">{userdatabyid.phone}</span>
                <br />
                <span className="spantext">Email :</span>
                <span className="title">{userdatabyid.email}</span>
              </div>
              <div style={{ margin: " 24px 0" }}>
                <button
                  className=" btn btn-outline-info "
                  onClick={this.openPopup}
                >
                  <i class="fa fa-edit"></i> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  getUserDetail,
  updateUser,
})(Profile);
