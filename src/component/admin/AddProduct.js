import React, { Component } from "react";
import $ from "jquery";
import validate from "jquery-validation";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import { CategoriesDetail, addCategories, addprod } from "../../action/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { red } from "@mui/material/colors";
import {
  FormHelperText,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
toast.configure();

<head>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
</head>;

class AddProduct extends Component {
  state = {
    categoryData: [],
    cat_id: [],
    name: "",
    image: [],
    description: "",
    quantity: "",
    price: "",
  };
  componentDidMount() {
    this.getCategories();
    $(document).ready(function () {
      $("#prodvali").validate({
        rules: {
          name: {
            required: true,
          },
          image: {
            required: true,
          },
          description: {
            required: true,
          },
          quantity: {
            required: true,
          },
          price: {
            required: true,
          },
          cate: {
            required: true,
          },
        },

        messages: {
          name: {
            required: "<p style='color:red'>Please provide a name</p>",
          },
          image: {
            required: "<p style='color:red'>Please provide a image</p>",
          },
          description: {
            required: "<p style='color:red'>Please provide a description</p>",
          },
          quantity: {
            required: "<p style='color:red'>Please provide a quantity</p>",
          },
          price: {
            required: "<p style='color:red'>Please provide a price</p>",
          },
          cate: {
            required: "<p style='color:red'>Please select category</p>",
          },
        },
      });
    });
  }

  getCategories() {
    this.props.CategoriesDetail((res) => {
      //   console.log("$$$$$$$$$$$$$$$", res.data);
      this.setState({ categoryData: res.data });
    });
  }
  handleCat(ee) {
    console.log("!@@@@@@@@@@@@", ee);
    this.setState({ cat_id: ee._id });
  }

  saveFile(e) {
    // console.log("^^^^^^^^^^^^^^^", e.target.files[0]);
    this.setState({ image: e.target.files[0] });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, image, description, quantity, price } = this.state;
    if (
      name != "" ||
      image != "" ||
      description != "" ||
      quantity != "" ||
      price != ""
    ) {
      let formData = new FormData();
      const data = {
        name: name,
        image: this.state.image,
        description: description,
        quantity: quantity,
        price: price,
        cat_id: this.state.cat_id,
      };
      for (var key in data) {
        //   console.log(key, "Gggg", data[key]);
        formData.append(key, data[key]);
      }
      this.props.addprod(formData, (res) => {
        if (res.status === 200) {
          toast.success("Product Added Successfully");
          setTimeout(() => {
            window.location.replace("/productDetails");
          }, 1000);
        } else {
          toast.warn("Please select category");
        }
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  render() {
    // console.log("!!!!!!!!!!!!!!!!!!", this.state.categoryData);
    return (
      <div className="container-scroller">
        <TopNav />

        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel formalign">
            <span className="heading ml-4 ">Add Product</span>
            <form
              id="prodvali"
              className="mx-1 mx-md-4 myFormCss"
              noValidate="novalidate"
              onSubmit={this.handleSubmit}
            >
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <>
                    <label className="form-label" for="name">
                      Please Select Category *
                    </label>
                    <Select
                      className="form-control"
                      sx={{
                        minWidth: " -webkit - fill - available !important",
                      }}
                    >
                      {this.state.categoryData.map((item) => {
                        // console.log(item._id, "rrr");
                        return (
                          <MenuItem
                            id="cate"
                            name="cate"
                            value={item.name}
                            onClick={() => this.handleCat(item)}
                            key={item.name}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <span id="demo2"></span>
                  </>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="name">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Product Name"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />{" "}
                  <span id="demo2"></span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="form3Example3c">
                    Image *
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
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="description">
                    Description *
                  </label>
                  {/* <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Enter description"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />{" "} */}
                  <TextareaAutosize
                    style={{
                      height: "47px",
                      overflow: "hidden",
                      marginTop: "0px",
                      marginBottom: " 0px",
                      border: "1px solid #b8ebb8",
                      width: "-webkit-fill-available",
                    }}
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                  <span id="demo2"></span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="quantity">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter quantity"
                    value={this.state.quantity}
                    onChange={(e) =>
                      this.setState({ quantity: e.target.value })
                    }
                  />{" "}
                  <span id="demo2"></span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="price">
                    Price *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    placeholder="Enter price"
                    value={this.state.price}
                    onChange={(e) => this.setState({ price: e.target.value })}
                  />{" "}
                  <span id="demo2"></span>
                </div>
              </div>
              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button
                  type="submit"
                  className="btn btn-primary pl-5 pr-5 pt-2 pb-2 "
                  // onClick={this.handleSubmit}
                >
                  Add
                </button>
              </div>
            </form>
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
  addCategories,
  CategoriesDetail,
  addprod,
})(AddProduct);
