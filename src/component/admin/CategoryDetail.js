import React, { Component } from "react";
import { CategoriesDetail, updateCat, deleteCat } from "../../action/index";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import "../../style/css/sidebar.css";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./AddProduct";
toast.configure();

class CategoryDetail extends Component {
  state = {
    categoryData: [],
    open: false,
    name: "",
    image: [],
    cat: [],
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    this.props.CategoriesDetail((res) => {
      //   console.log("$$$$$$$$$$$$$$$", res.data);
      this.setState({ categoryData: res.data });
    });
  }

  saveFile(e) {
    this.setState({ image: e.target.files[0] });
    // console.log("^^^^^^^^^^^^^^^", e.target.files[0]);
  }

  handleDelete(id) {
    this.props.deleteCat(id, (res) => {
      toast.success(res.data.message);
      this.getCategories();
    });
  }

  edit(data) {
    this.setState({ cat: data });
    this.handleOpen();
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleUpdate = (e) => {
    e.preventDefault();
    const { name, image, cat } = this.state;
    let formData = new FormData();
    const data = {
      name: name === "" ? cat.name : name,
      image: image,
    };
    for (var key in data) {
      // console.log(key, "Gggg", data[key]);
      formData.append(key, data[key]);
    }

    this.props.updateCat(cat._id, formData, (res) => {
      if (res.status === 200) {
        toast.success("Category Update Successfully");
        this.getCategories();
        window.location = "/categoryDetails";
      } else if (res.status === 400) {
        // toast.error(res.data.message);
      }
    });
  };

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
              <span className="heading ml-2 ">Category Lists</span>
              <a href="/addCat" className="anchrcolor btn btn-outline-danger">
                <i className="fa fa-plus mr-2"></i>ADD CATEGORY
              </a>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categoryData.map((item) => {
                  console.log(item, "rrr");
                  return (
                    <>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
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
                                Edit Category
                              </legend>
                              <div
                                key={item._id}
                                className="d-flex flex-row align-items-center mb-4"
                              >
                                {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    for="form3Example3c"
                                    style={{ color: "#6a5050" }}
                                  >
                                    Category Name
                                  </label>
                                  <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    defaultValue={this.state.cat.name}
                                    placeholder="Enter category name"
                                    style={{
                                      border: "1px solid #bfe9ae",
                                    }}
                                    // value={this.state.cat.name}
                                    onChange={(e) =>
                                      this.setState({ name: e.target.value })
                                    }
                                  />
                                </div>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    for="form3Example3c"
                                    style={{ color: "#6a5050" }}
                                  >
                                    Image
                                  </label>
                                  <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="form-control"
                                    // defaultValue={this.state.cat.image}
                                    placeholder="Upload image"
                                    style={{
                                      border: "1px solid #bfe9ae",
                                    }}
                                    // value={this.state.image}
                                    onChange={(e) => this.saveFile(e)}
                                  />
                                </div>
                              </div>
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button
                                  type="submit"
                                  style={{
                                    background: "none",
                                    color: "green",
                                    border: " 1px solid green",
                                  }}
                                  className="btn btn-primary "
                                  // onClick={this.handleSubmit}
                                >
                                  <i class="fa fa-refresh"></i> Update
                                </button>
                                &emsp; &emsp; &emsp;
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
                      <tr>
                        <td scope="row"></td>
                        <td>{item.name}</td>
                        <td>
                          <img
                            className="imgCss"
                            src={`http://94.237.3.78:4001/${item.image}`}
                          ></img>
                        </td>
                        <td>
                          <button
                            className="btn bg-transparent"
                            onClick={() => this.edit(item)}
                          >
                            <i className="fa fa-edit text-success m-2"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn bg-transparent"
                            onClick={() => this.handleDelete(item._id)}
                          >
                            <i className="fa fa-trash text-danger ml-3"></i>
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
  CategoriesDetail,
  updateCat,
  deleteCat,
})(CategoryDetail);
