import React, { Component } from "react";
import {
  getProduct,
  deleteProduct,
  updateProd,
  getAllBanner,
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

class ProductDetail extends Component {
  state = {
    productData: [],
    open: false,
    name: "",
    description: "",
    quantity: "",
    price: "",
    image: [],
    productDetail: [],
  };

  componentDidMount() {
    this.getProductD();
  }

  getProductD() {
    this.props.getProduct((res) => {
      console.log("$$$$$$$$$$$$$$$", res.data);
      this.setState({ productData: res.data });
    });
  }

  saveFile(e) {
    this.setState({ image: e.target.files[0] });
    // console.log("^^^^^^^^^^^^^^^", e.target.files[0]);
  }

  handleDelete(id) {
    this.props.deleteProduct(id, (res) => {
      toast.success("Product delete successfully");
      this.getProductD();
    });
  }

  edit(data) {
    this.setState({ productDetail: data });
    // console.log("@@@@@@@@@@@@@@@@", data._id);
    this.handleOpen();
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleUpdate = (e) => {
    e.preventDefault();
    const { name, image, description, quantity, price, productDetail } =
      this.state;
    // console.log("******************", productDetail);
    let formData = new FormData();
    const data = {
      name: name === "" ? productDetail.name : name,
      image: image,
      description: description === "" ? productDetail.description : description,
      quantity: quantity === "" ? productDetail.quantity : quantity,
      price: price === "" ? productDetail.price : price,
    };
    for (var key in data) {
      // console.log(key, "Gggg", data[key]);
      formData.append(key, data[key]);
    }

    this.props.updateProd(productDetail._id, formData, (res) => {
      if (res.status === 200) {
        toast.success("Product Update Successfully");
        this.getProductD();
        window.location = "/productDetails";
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
              <span className="heading ml-2 ">Product Lists</span>
              <a href="/addPro" className="anchrcolor btn btn-outline-danger">
                <i className="fa fa-plus mr-2"></i>ADD PRODUCTS
              </a>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.productData.map((item) => {
                  console.log(item, "rrr");
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
                                Edit Product
                              </legend>
                              <div className="form-outline flex-fill mb-0">
                                <label
                                  className="form-label"
                                  for="form3Example3c"
                                  style={{ color: "#6a5050" }}
                                >
                                  Product Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  className="form-control"
                                  defaultValue={this.state.productDetail.name}
                                  placeholder="Enter Product name"
                                  style={{
                                    border: "1px solid #bfe9ae",
                                  }}
                                  onChange={(e) =>
                                    this.setState({ name: e.target.value })
                                  }
                                />
                              </div>
                              &ensp;
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
                                  // defaultValue={this.state.productDetail.image}
                                  placeholder="Upload image"
                                  style={{
                                    border: "1px solid #bfe9ae",
                                  }}
                                  // value={this.state.image}
                                  onChange={(e) => this.saveFile(e)}
                                />
                              </div>
                              &ensp;
                              <div className="form-outline flex-fill mb-0">
                                <label
                                  className="form-label"
                                  for="form3Example3c"
                                  style={{ color: "#6a5050" }}
                                >
                                  Description
                                </label>
                                <input
                                  type="text"
                                  id="description"
                                  name="description"
                                  className="form-control"
                                  defaultValue={
                                    this.state.productDetail.description
                                  }
                                  placeholder="Enter Description"
                                  style={{
                                    border: "1px solid #bfe9ae",
                                  }}
                                  onChange={(e) =>
                                    this.setState({
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              &ensp;
                              <div className="form-outline flex-fill mb-0">
                                <label
                                  className="form-label"
                                  for="form3Example3c"
                                  style={{ color: "#6a5050" }}
                                >
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  id="quantity"
                                  name="quantity"
                                  className="form-control"
                                  defaultValue={
                                    this.state.productDetail.quantity
                                  }
                                  placeholder="Enter quantity"
                                  style={{
                                    border: "1px solid #bfe9ae",
                                  }}
                                  onChange={(e) =>
                                    this.setState({ quantity: e.target.value })
                                  }
                                />
                              </div>
                              &ensp;
                              <div className="form-outline flex-fill mb-0">
                                <label
                                  className="form-label"
                                  for="form3Example3c"
                                  style={{ color: "#6a5050" }}
                                >
                                  Price
                                </label>
                                <input
                                  type="number"
                                  id="price"
                                  name="price"
                                  className="form-control"
                                  defaultValue={this.state.productDetail.price}
                                  placeholder="Enter price"
                                  style={{
                                    border: "1px solid #bfe9ae",
                                  }}
                                  onChange={(e) =>
                                    this.setState({ price: e.target.value })
                                  }
                                />
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
                        <td>{item.name}</td>
                        <td>
                          <img
                            className="imgCss"
                            src={`http://94.237.3.78:4001/${item.image}`}
                          ></img>
                        </td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
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
  getProduct,
  getAllBanner,
  updateProd,
  deleteProduct,
})(ProductDetail);
