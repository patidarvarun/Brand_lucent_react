import React, { Component } from "react";
import $ from "jquery";
import validate from "jquery-validation";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import {
  CategoriesDetail,
  addCategories,
  getProduct,
  addprodOffer,
} from "../../action/index";
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

class AddProductOffer extends Component {
  state = {
    categoryData: [],
    productData: [],
    cat_id: [],
    pro_id: [],
    discount: "",
  };
  componentDidMount() {
    this.getCategories();
    this.getProductData();
    $(document).ready(function () {
      $("#prodvalid").validate({
        rules: {
          discount: {
            required: true,
          },
          cate: {
            required: true,
          },
          pro: {
            required: true,
          },
        },

        messages: {
          discount: {
            required: "<p style='color:red'>Please provide a discount</p>",
          },
          pro: {
            required: "<p style='color:red'>Please select product</p>",
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
      this.setState({ categoryData: res.data });
    });
  }
  getProductData() {
    this.props.getProduct((res) => {
      this.setState({ productData: res.data });
    });
  }
  handleCat(ee) {
    this.setState({ cat_id: ee._id });
  }
  handlePro(ea) {
    this.setState({ pro_id: ea });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { discount } = this.state;
    const data = {
      discountPrice: discount,
      cat_id: this.state.cat_id,
      productId: this.state.pro_id,
    };
    this.props.addprodOffer(data, (res) => {
      if (res.status === 200) {
        toast.success("ProductOffer Added Successfully");
        setTimeout(() => {
          window.location.replace("/offerDetail");
        }, 1000);
      }
    });
  };

  render() {
    return (
      <div className="container-scroller">
        <TopNav />

        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel formalign">
            <span className="heading ml-4 ">Add Product Offers</span>
            <form
              id="prodvalid"
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
                  <>
                    <label className="form-label" for="name">
                      Please Select Product *
                    </label>
                    <Select
                      className="form-control"
                      sx={{
                        minWidth: " -webkit - fill - available !important",
                      }}
                    >
                      {this.state.productData.map((item) => (
                        // let data = item.cat_id._id == this.state.cat_id;
                        // return data == true ? (
                        <MenuItem
                          id="pro"
                          name="pro"
                          value={item.name}
                          onClick={() => this.handlePro(item._id)}
                          key={item.name}
                        >
                          {item.name}
                        </MenuItem>
                        // ) : null;
                      ))}
                    </Select>
                    <span id="demo2"></span>
                  </>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="name">
                    Discount *
                  </label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    className="form-control"
                    placeholder="Enter Discount"
                    value={this.state.discount}
                    onChange={(e) =>
                      this.setState({ discount: e.target.value })
                    }
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
  return {};
};
export default connect(mapStateToProps, {
  addCategories,
  CategoriesDetail,
  getProduct,
  addprodOffer,
})(AddProductOffer);
