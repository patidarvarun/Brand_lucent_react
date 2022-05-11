import React, { Component } from "react";
import { getHeaderData, updateHeader, deleteHeaderr } from "../../action/index";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import "../../style/css/sidebar.css";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Header extends Component {
  state = {
    HeaderData: [],
    headerDetail: [],
    lebel: "",
    title: "",
    content: "",
    open: false,
  };

  componentDidMount() {
    this.getHeader();
  }
  getHeader() {
    this.props.getHeaderData((res) => {
      // console.log("@@@@@@@@@@@@@@", res);
      this.setState({ HeaderData: res.data.headerData });
    });
  }

  handleDelete(id) {
    // console.log("$$$$$$$$$$$$$$$$$$", id);
    this.props.deleteHeaderr(id, (res) => {
      toast.success("Header delete successfully");
      this.getHeader();
    });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    // console.log("!!!!!!!!!!!!!!", this.state.newsLetterDetail);
    const { title, content, lebel, headerDetail } = this.state;
    const data = {
      _id: headerDetail._id,
      labelofheader: lebel === "" ? headerDetail.labelofheader : lebel,
      titleofcontent: title === "" ? headerDetail.titleofcontent : title,
      contentofpage: content === "" ? headerDetail.contentofpage : content,
    };

    this.props.updateHeader(data, (res) => {
      if (res.status === 200) {
        toast.success("Header Update Successfully");
        window.location.replace("/header");
      } else if (res.status === 400) {
        // toast.error(res.data.message);
      }
    });
  };

  edit(data) {
    this.setState({ headerDetail: data });
    // console.log("@@@@@@@@@@@@@@@@", data);
    this.handleOpen();
  }

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

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
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&", this.state.bannerData);
    return (
      <div className="container-scroller">
        <TopNav />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel m-1">
            <div className="row mt-3 mb-3 rowdiv">
              <span className="heading ml-2 ">Header Lists</span>
              <a
                href="/headerForm"
                className="anchrcolor btn btn-outline-danger"
              >
                <i className="fa fa-plus mr-2"></i>ADD HEADER
              </a>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Label</th>
                  <th scope="col">Title</th>
                  <th scope="col">Content</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.HeaderData.map((item) => {
                  // console.log(item, "rrr");
                  return (
                    <>
                      <Modal
                        // aria-labelledby="transition-modal-title"
                        // aria-describedby="transition-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={this.state.open}>
                          <Box sx={style}>
                            <form
                              className="mx-1 mx-md-4"
                              onSubmit={this.handleUpdate}
                            >
                              <legend
                                className="text-center"
                                style={{
                                  color: "darkolivegreen",
                                  background: "burlywood",
                                }}
                              >
                                Edit Header
                              </legend>
                              <div className="mb-4">
                                <div className="form-outline flex-fill mb-0">
                                  <label className="form-label" for="name">
                                    Label *
                                  </label>
                                  <input
                                    type="text"
                                    id="lebel"
                                    name="lebel"
                                    className="form-control"
                                    placeholder="Enter lebel"
                                    defaultValue={
                                      this.state.headerDetail.labelofheader
                                    }
                                    onChange={(e) =>
                                      this.setState({ lebel: e.target.value })
                                    }
                                  />{" "}
                                  <span id="demo2"></span>
                                </div>
                                <br />
                                <div className="form-outline flex-fill mb-0">
                                  <label className="form-label" for="name">
                                    Title *
                                  </label>
                                  <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter title"
                                    defaultValue={
                                      this.state.headerDetail.titleofcontent
                                    }
                                    onChange={(e) =>
                                      this.setState({
                                        title: e.target.value,
                                      })
                                    }
                                  />{" "}
                                  <span id="demo2"></span>
                                </div>
                                <br />
                                <div className="form-outline flex-fill mb-0">
                                  <label className="form-label" for="name">
                                    Content *
                                  </label>
                                  <input
                                    type="text"
                                    id="content"
                                    name="content"
                                    className="form-control"
                                    placeholder="Enter content"
                                    defaultValue={
                                      this.state.headerDetail.contentofpage
                                    }
                                    onChange={(e) =>
                                      this.setState({
                                        content: e.target.value,
                                      })
                                    }
                                  />{" "}
                                  <span id="demo2"></span>
                                </div>
                              </div>
                              &nbsp; &nbsp; &nbsp;
                              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button
                                  type="submit"
                                  style={{
                                    background: "none",
                                    color: "green",
                                    border: " 1px solid green",
                                  }}
                                  className="btn btn-primary "
                                >
                                  <i class="fa fa-refresh"></i> Update
                                </button>
                                &ensp; &ensp; &ensp;
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
                      <tr key={"gh"}>
                        <td>{""}</td>
                        <td>{item.labelofheader}</td>
                        <td>{item.titleofcontent}</td>
                        <td>{item.contentofpage}</td>
                        <td>
                          <button
                            className="btn bg-transparent"
                            onClick={() => this.edit(item)}
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

const mapStateToProps = (store) => {
  // const { auth, profile } = store;
  return {};
};
export default connect(mapStateToProps, {
  getHeaderData,
  updateHeader,
  deleteHeaderr,
})(Header);
