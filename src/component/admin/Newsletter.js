import React, { Component } from "react";
import {
  getNewsLetter,
  updateNewsLetterr,
  deleteNewsLetterr,
} from "../../action/index";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import "../../style/css/sidebar.css";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Newsletter extends Component {
  state = {
    NewsData: [],
    newsLetterDetail: [],
    title: "",
    description: "",
    open: false,
    image: [],
  };

  componentDidMount() {
    this.getNewsLetterr();
  }
  getNewsLetterr() {
    this.props.getNewsLetter((res) => {
      // console.log("@@@@@@@@@@@@@@", res.data.NewsLetterData );
      this.setState({ NewsData: res.data.NewsLetterData });
    });
  }

  handleDelete(id) {
    // console.log("$$$$$$$$$$$$$$$$$$", id);
    this.props.deleteNewsLetterr(id, (res) => {
      toast.success("NewsLetter delete successfully");
      this.getNewsLetterr();
    });
  }

  saveFile(e) {
    // console.log("^^^^^^^^^^^^^^^", e.target.files[0]);
    this.setState({ image: e.target.files[0] });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    // console.log("!!!!!!!!!!!!!!", this.state.newsLetterDetail);
    const { title, image, description, newsLetterDetail } = this.state;

    let formData = new FormData();
    const data = {
      _id: newsLetterDetail._id,
      title: title === "" ? newsLetterDetail.title : title,
      description:
        description === "" ? newsLetterDetail.description : description,
      backgroundImage: image,
    };
    for (var key in data) {
      //   console.log(key, "Gggg", data[key]);
      formData.append(key, data[key]);
    }
    this.props.updateNewsLetterr(formData, (res) => {
      if (res.status === 200) {
        toast.success("NewsLetter Update Successfully");
        window.location.replace("/newsletter");
      } else if (res.status === 400) {
        // toast.error(res.data.message);
      }
    });
  };

  edit(data) {
    this.setState({ newsLetterDetail: data });
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
              <span className="heading ml-2 ">NewsLetter Lists</span>
              <a
                href="/newsLetterform"
                className="anchrcolor btn btn-outline-danger"
              >
                <i className="fa fa-plus mr-2"></i>ADD NEWSLETTER
              </a>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Background Image</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.NewsData.map((item) => {
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
                                Edit NewsLetter
                              </legend>
                              <div className="mb-4">
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
                                      this.state.newsLetterDetail.title
                                    }
                                    onChange={(e) =>
                                      this.setState({ title: e.target.value })
                                    }
                                  />{" "}
                                  <span id="demo2"></span>
                                </div>
                                <br />
                                <div className="form-outline flex-fill mb-0">
                                  <label className="form-label" for="name">
                                    Description *
                                  </label>
                                  <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    placeholder="Enter description"
                                    defaultValue={
                                      this.state.newsLetterDetail.description
                                    }
                                    onChange={(e) =>
                                      this.setState({
                                        description: e.target.value,
                                      })
                                    }
                                  />{" "}
                                  <span id="demo2"></span>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    for="form3Example3c"
                                  >
                                    BackgroundImage *
                                  </label>
                                  <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="form-control"
                                    placeholder="upload image"
                                    style={{
                                      border: "1px solid #bfe9ae",
                                    }}
                                    // value={this.state.image}
                                    onChange={(e) => this.saveFile(e)}
                                  />
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
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          <img
                            className="imgCss"
                            src={`http://94.237.3.78:4001/${item.backgroundImage}`}
                          ></img>
                        </td>
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
  getNewsLetter,
  updateNewsLetterr,
  deleteNewsLetterr,
})(Newsletter);
