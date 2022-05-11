import React, { Component } from "react";
import $ from "jquery";
import validate from "jquery-validation";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { createBannerr } from "../../action/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { red } from "@mui/material/colors";
toast.configure();

<head>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
</head>;

class BannerForm extends Component {
  state = {
    title: "",
    description: "",
    image: [],
    logo: [],
  };

  componentDidMount() {
    $(document).ready(function () {
      $("#bannerr").validate({
        rules: {
          title: {
            required: true,
          },
          image: {
            required: true,
          },
          logo: {
            required: true,
          },
          description: {
            required: true,
          },
        },

        messages: {
          title: {
            required: "<p style='color:red'>Please provide a name</p>",
          },
          image: {
            required: "<p style='color:red'>Please provide a image</p>",
          },
          logo: {
            required: "<p style='color:red'>Please provide a logo</p>",
          },
          description: {
            required: "<p style='color:red'>Please provide a description</p>",
          },
        },
      });
    });
  }

  saveFile(e) {
    // console.log("^^^^^^^^^^^^^^^", e.target.files[0]);
    this.setState({ image: e.target.files[0] });
  }
  saveFiler(e) {
    // console.log("!!!!!!!!!!!!!!!!!!", e.target.files[0]);
    this.setState({ logo: e.target.files[0] });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { title, image, logo, description } = this.state;
    if (title != "" || image != "" || logo != "" || description != "") {
      let formData = new FormData();
      const data = {
        title: title,
        description: description,
        banner: this.state.image,
        logo: this.state.logo,
      };
      for (var key in data) {
        //   console.log(key, "Gggg", data[key]);
        formData.append(key, data[key]);
      }
      this.props.createBannerr(formData, (res) => {
        if (res.status === 200) {
          toast.success("Banner Create Successfully");
          window.location.replace("/bannerList");
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
            <span className="heading ml-4 ">Banner Form</span>
            <form
              id="bannerr"
              className="mx-1 mx-md-4 myFormCss"
              noValidate="novalidate"
              onSubmit={this.handleSubmit}
              // style={{ background: "bisque", padding: "20px" }}
            >
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
                    value={this.state.name}
                    onChange={(e) => this.setState({ title: e.target.value })}
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
                    value={this.state.name}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />{" "}
                  <span id="demo2"></span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="form3Example3c">
                    Banner *
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
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="form3Example3c">
                    LOGO *
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    className="form-control"
                    placeholder="upload logo"
                    style={{
                      border: "1px solid #bfe9ae",
                    }}
                    // value={this.state.logo}
                    onChange={(e) => this.saveFiler(e)}
                  />
                  <span id="demo2"></span>
                </div>
              </div>
              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button
                  type="submit"
                  className="btn btn-primary pl-5 pr-5 pt-2 pb-2 "
                  // onClick={this.handleSubmit}
                >
                  Submit
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
  createBannerr,
})(BannerForm);
