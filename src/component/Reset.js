import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import validate from "jquery-validation";
import "bootstrap/dist/css/bootstrap.css";
import { resetPass } from "../action/index";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../component/user/AppBar";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
toast.configure();

<head>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
</head>;

class Reset extends Component {
  state = {
    email: "",
    open: false,
  };
  componentDidMount() {
    $(document).ready(function () {
      $("#resetemail").validate({
        rules: {
          email: {
            required: true,
            email: true,
          },
        },
        messages: {
          email: {
            required: "<p style='color:red'>Please provide a email</p>",
            email:
              "<p style='color:red'>Please enter a valid email address.</p>",
          },
        },
      });
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    // window.location = "/";
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const requestData = {
      email: email,
    };
    this.props.resetPass(requestData, (res) => {
      if (res.status === 200) {
        localStorage.setItem(
          "ForgotPasswordToken",
          JSON.stringify(res.data.token)
        );
        toast.success("Email has been sent successfully");
        if (res.status === 200) {
          setTimeout(() => {
            window.location = "/login";
          }, 2000);
        }
        // console.log("Success*****", res);
      } else {
        toast.error("User doesn't exists with that email");
      }
    });
    // this.handleOpen();
  };

  render() {
    return (
      <div>
        <AppBar />
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100" style={{ marginTop: "45px" }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p
                          style={{ marginLeft: "68px !important" }}
                          className=" h1 mb-5 mx-1 mt-4"
                        >
                          Reset Password
                        </p>
                        <p
                          style={{
                            position: "absolute",
                            top: "74px",
                            left: "60px",
                            fontSize: "14px",
                            color: "rgb(102 116 116)",
                          }}
                        >
                          Enter your email address and we will send further
                          instructions on how to reset the password
                        </p>
                        <Modal
                          hideBackdrop
                          open={this.state.open}
                          onClose={this.handleClose}
                          aria-labelledby="child-modal-title"
                          aria-describedby="child-modal-description"
                        >
                          <Box
                            style={{
                              width: "390px",
                              position: "absolute",
                              background: "#282946",
                              color: "white",
                              top: "8em",
                              height: "11em",
                              left: "33.3em",
                              borderRadius: "5px",
                            }}
                          >
                            <h2 id="child-modal-title"></h2>
                            <p
                              id="child-modal-description"
                              style={{ padding: "40px", marginLeft: "20px" }}
                            >
                              Mail has been sent successfully Please check your
                              mail.
                            </p>
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <Button
                              style={{
                                marginLeft: " 210px",
                                background: " white",
                                borderRadius: "48px",
                                padding: "2px",
                              }}
                              onClick={this.handleClose}
                            >
                              <CloseIcon />
                            </Button>
                          </Box>
                        </Modal>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <br />
                        <br />
                        <br />
                        <form
                          id="resetemail"
                          className="mx-1 mx-md-4"
                          noValidate="novalidate"
                          onSubmit={this.handleSubmit}
                        >
                          <div className="d-flex flex-row align-items-center mb-4">
                            {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example3c"
                                style={{ color: "#6a5050" }}
                              >
                                Enter Email address*
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
                                style={{
                                  padding: "30px",
                                  border: "1px solid #bfe9ae",
                                }}
                                value={this.state.email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                              />
                              <span id="demo1"></span>
                            </div>
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            {this.state.email == "" ? (
                              <button
                                type="submit"
                                style={{
                                  background: "#688f4e",
                                  width: "19.5em",
                                  border: "none",
                                  position: "absolute",
                                  bottom: "-32px",
                                  height: "50px",
                                  left: "2.5em",
                                }}
                                className="btn btn-primary "
                                disabled
                                // onClick={this.handleSubmit}
                              >
                                Reset Password
                              </button>
                            ) : (
                              <button
                                type="submit"
                                style={{
                                  background: "#688f4e",
                                  width: "19.5em",
                                  border: "none",
                                  position: "absolute",
                                  bottom: "-32px",
                                  height: "50px",
                                  left: "2.5em",
                                }}
                                className="btn btn-primary "
                                onClick={this.handleSubmit}
                              >
                                Reset Password
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", padding: " 115px" }}>
                      Term of Use. Privacy Policy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  // const { auth, profile } = store;
  return {};
};
export default connect(mapStateToProps, {
  resetPass,
})(Reset);
