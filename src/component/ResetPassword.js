import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";
import validate from "jquery-validation";
import AppBar from "../component/user/AppBar";
import { resetPassword } from "../action/index";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box } from "@mui/system";

class ResetPassword extends Component {
  // state = initialState;
  state = {
    password: "",
    c_password: "",
  };

  componentDidMount() {
    $(document).ready(function () {
      $("#resetpassValidation").validate({
        rules: {
          password: {
            required: true,
            minlength: 5,
          },
          c_password: {
            required: true,
            minlength: 5,
            equalTo: "#password",
          },
        },
        messages: {
          password: {
            required: "<p style='color:red'>Please provide a password</p>",
            minlength:
              "<p style='color:red'>Your password must be at least 5 characters long</p>",
          },
          c_password: {
            required: "<p style='color:red'>Please provide a password</p>",
            minlength:
              "<p style='color:red'>Your password must be at least 5 characters long</p>",
            equalTo:
              "<p style='color:red'>Please enter the same password as above</p>",
          },
        },
      });
    });
  }
  handleSubmit = (e) => {
    const token = localStorage.getItem("ForgotPasswordToken");
    e.preventDefault();

    const { password, c_password } = this.state;
    if ((password == "", c_password == "")) {
      console.log("efer");
    } else {
      const requestData = {
        newPassword: password,
        confirmPassword: c_password,
        token: JSON.parse(token),
      };
      this.props.resetPassword(requestData, (res) => {
        if (res.status === 200) {
          localStorage.clear("ForgotPasswordToken");
          window.location = "/login";
          // console.log("resetpassword", res);
          // this.setState({ data: res });
        } else {
          // alert("Confirm password doesn't match");
          console.log("Something went wrong");
        }
      });
    }
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
                          Set Password
                        </p>
                        <p
                          style={{
                            position: "absolute",
                            top: "74px",
                            left: "85px",
                            fontSize: "16px",
                            color: "rgb(102 116 116)",
                          }}
                        >
                          Enter new password and confirm
                        </p>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <form
                          id="resetpassValidation"
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
                                New password*
                              </label>
                              <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter new password"
                                style={{
                                  padding: "30px",
                                  border: "1px solid #bfe9ae",
                                }}
                                value={this.state.password}
                                onChange={(e) =>
                                  this.setState({ password: e.target.value })
                                }
                              />
                              <span id="demo2"></span>
                            </div>
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-flex flex-row align-items-center mb-4">
                            {/* <i className="fas fa-lock fa-lg me-3 fa-fw"></i> */}
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example4c"
                                style={{ color: "#6a5050" }}
                              >
                                Confirm password*
                              </label>
                              <input
                                type="c_password"
                                id="c_password"
                                name="c_password"
                                className="form-control"
                                placeholder="Confirn your new password"
                                style={{
                                  padding: "30px",
                                  border: "1px solid #bfe9ae",
                                }}
                                value={this.state.c_password}
                                onChange={(e) =>
                                  this.setState({ c_password: e.target.value })
                                }
                              />
                              <span id="demo2"></span>
                            </div>
                          </div>{" "}
                          &nbsp; &nbsp; &nbsp;
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              style={{
                                background: "#688f4e",
                                width: "19.5em",
                                border: "none",
                                position: "absolute",
                                bottom: "-32px",
                                height: "50px",
                                left: "3.1em",
                              }}
                              className="btn btn-primary "
                              // onClick={this.handleSubmit}
                            >
                              Login
                            </button>
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
  resetPassword,
})(ResetPassword);
