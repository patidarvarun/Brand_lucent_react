import React, { Component } from "react";
import $ from "jquery";
import validate from "jquery-validation";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { createFooterr } from "../../action/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { red } from "@mui/material/colors";
import "../../style/main.css";
toast.configure();

<head>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
</head>;

class FooterForm extends Component {
  state = {
    title: "",
    titleFooter: "",
    content: "",
    lebel: "",
  };

  componentDidMount() {
    $(document).ready(function () {
      $("#header").validate({
        rules: {
          title: {
            required: true,
          },
          titleofFooter: {
            required: true,
          },
          content: {
            required: true,
          },

          lebel: {
            required: true,
          },
        },

        messages: {
          title: {
            required: "<p style='color:red'>Please provide a title</p>",
          },
          titleofFooter: {
            required: "<p style='color:red'>Please provide a titleFooter</p>",
          },
          content: {
            required: "<p style='color:red'>Please provide a content</p>",
          },

          lebel: {
            required: "<p style='color:red'>Please provide a lebel</p>",
          },
        },
      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, titleFooter, content, lebel } = this.state;
    if (title != "" || content != "" || titleFooter != "" || lebel != "") {
      const data = {
        title: title,
        labeloffooter: lebel,
        titleoffooter: titleFooter,
        contentofpage: content,
      };

      this.props.createFooterr(data, (res) => {
        if (res.status === 200) {
          toast.success("Header Create Successfully");
          window.location.replace("/footer");
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
            <span className="heading ml-4 ">Footer Form</span>
            <form
              id="header"
              className="mx-1 mx-md-4 myFormCss"
              noValidate="novalidate"
              onSubmit={this.handleSubmit}
              // style={{ background: "bisque", padding: "20px" }}
            >
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
                    defaultValue={this.state.lebel}
                    onChange={(e) => this.setState({ lebel: e.target.value })}
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
                    defaultValue={this.state.title}
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
                    Title Of Footer *
                  </label>
                  <input
                    type="text"
                    id="titleofFooter"
                    name="titleofFooter"
                    className="form-control"
                    placeholder="Enter titleofFooter"
                    defaultValue={this.state.titleFooter}
                    onChange={(e) =>
                      this.setState({
                        titleFooter: e.target.value,
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
                    defaultValue={this.state.content}
                    onChange={(e) =>
                      this.setState({
                        content: e.target.value,
                      })
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
  createFooterr,
})(FooterForm);
