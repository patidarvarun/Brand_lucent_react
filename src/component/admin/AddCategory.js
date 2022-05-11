import React, { Component } from "react";
import $ from "jquery";
import validate from "jquery-validation";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import { addCategories } from "../../action/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { red } from "@mui/material/colors";
toast.configure();

<head>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
</head>;

class AddCategory extends Component {
  state = {
    name: "",
    image: [],
  };

  componentDidMount() {
    $(document).ready(function () {
      $("#categoryvali").validate({
        rules: {
          name: {
            required: true,
          },
          image: {
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
        },
      });
    });
  }

  saveFile(e) {
    // console.log("^^^^^^^^^^^^^^^", e.target.files[0]);
    this.setState({ image: e.target.files[0] });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, image } = this.state;
    if (name != "" || image != "") {
      let formData = new FormData();
      const data = {
        name: name,
        image: this.state.image,
      };
      for (var key in data) {
        //   console.log(key, "Gggg", data[key]);
        formData.append(key, data[key]);
      }
      // console.log("imageEEEEEEEEEEEEEEEEE", image);
      this.props.addCategories(formData, (res) => {
        if (res.status === 200) {
          toast.success("Category Added Successfully");
          window.location.replace("/categoryDetails");
        } else if (res.status === 400) {
          // toast.error(res.data.message);
        }
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  render() {
    return (
      <div className="container-scroller">
        <TopNav />

        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel formalign">
            <span className="heading ml-4 ">Add Category</span>
            <form
              id="categoryvali"
              className="mx-1 mx-md-4 myFormCss"
              noValidate="novalidate"
              onSubmit={this.handleSubmit}
            >
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
                    placeholder="Enter Category Name"
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
})(AddCategory);
