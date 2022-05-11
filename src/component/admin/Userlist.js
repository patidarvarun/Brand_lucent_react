import React, { Component } from "react";
import {
  userDetail,
  deleteUser,
  getUserDetail,
  updateUser,
} from "../../action/index";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import {
  Fade,
  Modal,
  Backdrop,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/css/sidebar.css";
toast.configure();
class UserList extends Component {
  state = {
    userData: [],
    userdatabyid: [],
    openmodel: false,
    name: "",
    email: "",
    phone: "",
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser() {
    this.props.userDetail((res) => {
      this.setState({ userData: res.data.users });
    });
  }

  handleStatusApprove(data) {
    const requestData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone.toString(),
      status: data.status === "pending" ? "approved" : "pending",
    };
    this.props.updateUser(requestData, (res) => {
      if (res.status === 200) {
        toast.success("Status Changed");
        this.handleGetUser();
      } else if (res.status === 400) {
        toast.error(res.data.message);
      }
    });
  }

  handleGetUserById(id) {
    this.props.getUserDetail(id, (res) => {
      this.setState({ userdatabyid: res.data.user, openmodel: true });
    });
  }

  handleDelete(id) {
    this.props.deleteUser(id, (res) => {
      toast.success(res.data.message);
      this.handleGetUser();
    });
  }

  handleClose = () => this.setState({ openmodel: false });

  handleUpdate = () => {
    const { name, email, phone,userdatabyid } = this.state;
    const requestData = {
      _id: userdatabyid._id,
      name: name === "" ? userdatabyid.name : name,
      email: email === "" ? userdatabyid.email : email,
      phone: phone === "" ? userdatabyid.phone.toString() : phone.toString(),
      status: userdatabyid.status,
    };
    this.props.updateUser(requestData, (res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        this.handleGetUser();
      } else if (res.status === 400) {
        toast.error(res.data.message);
      }
    });
  }

  render() {
    const { openmodel, userdatabyid } = this.state;
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
              <form class="mui-form" onSubmit={this.handleUpdate}>
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
                  <button
                    type="submit"
                    class="btn btn-outline-success mr-5"
                    // onClick={() => }
                  >
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
          <div className="main-panel m-1">
            <div className="row mt-3 mb-3 rowdiv">
              <span className="heading ml-2 ">User Lists</span>
              <a href="/addUser" className="anchrcolor btn btn-outline-danger">
                <i className="fa fa-plus mr-2"></i>ADD USER
              </a>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userData.map((item) => {
                  return (
                    <>
                      <tr key={item._id}>
                        <td scope="row">{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>
                          <button
                            type="button"
                            className={
                              item.status === "pending"
                                ? "btn btn-outline-success"
                                : "btn btn-outline-primary"
                            }
                            onClick={() => this.handleStatusApprove(item)}
                          >
                            {item.status === "pending"
                              ? "Approve"
                              : "Unapprove"}
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn bg-transparent"
                            onClick={() => this.handleGetUserById(item._id)}
                          >
                            <i className="fa fa-edit text-success "></i>
                          </button>
                        </td>
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
                  );
                })}
              </tbody>
            </table>
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
  userDetail,
  deleteUser,
  getUserDetail,
  updateUser,
})(UserList);
