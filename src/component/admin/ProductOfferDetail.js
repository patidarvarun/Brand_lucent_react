import React, { Component } from "react";
import {
  getProductDetail,
  deleteProductOffer,
  updateProdOffer,
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

class ProductOfferDetail extends Component {
  state = {
    productDataOffer: [],
    open: false,
    discount: "",
    productDetail: [],
  };

  componentDidMount() {
    this.getProductoffers();
  }

  getProductoffers() {
    this.props.getProductDetail((res) => {
      console.log("$$$$$$$$$$$$$$$", res.data);
      this.setState({ productDataOffer: res.data });
    });
  }

  handleDelete(id) {
    // console.log("$$$$$$$$$$$", id);
    this.props.deleteProductOffer(id, (res) => {
      toast.success("Product delete successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.getProductofferss();
    });
  }

  edit(data) {
    this.setState({ productDetail: data });
    console.log("@@@@@@@@@@@@@@@@data", data);
    this.handleOpen();
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleUpdate = (e) => {
    e.preventDefault();
    const { discount, productDetail } = this.state;
    // console.log("******************", productDetail);
    const data = {
      discountPrice:
        this.state.discount === "" ? productDetail.discountPrice : discount,
    };
    this.props.updateProdOffer(productDetail._id, data, (res) => {
      if (res.status === 200) {
        toast.success("Discount Update Successfully");
        this.getProductoffers();
        window.location = "/offerDetail";
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
              <span className="heading ml-2 ">Product Offer Lists</span>
              <a
                href="/productOffer"
                className="anchrcolor btn btn-outline-danger"
              >
                <i className="fa fa-plus mr-2"></i>ADD PRODUCTS OFFERS
              </a>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.productDataOffer.map((item) => {
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
                                Edit Discount
                              </legend>
                              <div className="form-outline flex-fill mb-0">
                                <label
                                  className="form-label"
                                  for="form3Example3c"
                                  style={{ color: "#6a5050" }}
                                >
                                  Discount
                                </label>
                                <input
                                  type="text"
                                  id="discount"
                                  name="discount"
                                  className="form-control"
                                  //   defaultValue={
                                  //     this.state.productDetail.discount
                                  //   }
                                  placeholder="Enter discount"
                                  style={{
                                    border: "1px solid #bfe9ae",
                                  }}
                                  onChange={(e) =>
                                    this.setState({
                                      discount: e.target.value,
                                    })
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
                        <td>{item.productId.name}</td>
                        <td>
                          <img
                            className="imgCss"
                            src={`http://94.237.3.78:4001/${item.productId.image}`}
                          ></img>
                        </td>
                        <td>{item.discountPrice}</td>
                        <td>{item.productId.price}</td>
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
  getProductDetail,
  updateProdOffer,
  deleteProductOffer,
})(ProductOfferDetail);
