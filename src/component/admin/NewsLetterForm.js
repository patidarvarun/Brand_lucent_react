import React, { Component } from "react";
import $ from "jquery";
import validate from "jquery-validation";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { newsLetter } from "../../action/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

<head>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
</head>;

class NewsLetterForm extends Component {
  state = {
    title: "",
    description: "",
    image: [],
  };

  componentDidMount() {
    $(document).ready(function () {
      $("#newsletter").validate({
        rules: {
          title: {
            required: true,
          },
          image: {
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
  handleSubmit = (e) => {
    e.preventDefault();

    const { title, image, description } = this.state;
    if (title != "" || image != "" || description != "") {
      let formData = new FormData();
      const data = {
        title: title,
        description: description,
        backgroundImage: this.state.image,
      };
      for (var key in data) {
        //   console.log(key, "Gggg", data[key]);
        formData.append(key, data[key]);
      }
      this.props.newsLetter(formData, (res) => {
        if (res.status === 200) {
          toast.success("NewsLetter Create Successfully");
          window.location.replace("/newsletter");
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
            <span className="heading ml-4 ">NewsLetter Form</span>
            <form
              id="newsletter"
              className="mx-1 mx-md-4 myFormCss"
              noValidate="novalidate"
              onSubmit={this.handleSubmit}
              //   style={{ background: "bisque", padding: "20px" }}
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
                    value={this.state.title}
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
                    value={this.state.description}
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
                    Background Image *
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
  newsLetter,
})(NewsLetterForm);
