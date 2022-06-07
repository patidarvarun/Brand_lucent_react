import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../action";
import $ from "jquery";
import validate from "jquery-validation";
import { connect } from "react-redux";
import AppBar from "../component/user/AppBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

<head>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
</head>;

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    $(document).ready(function () {
      $("#myform").validate({
        rules: {
          password: {
            required: true,
            minlength: 5,
          },
          email: {
            required: true,
            email: true,
          },
        },
        messages: {
          password: {
            required: "<p style='color:red'>Please provide a password</p>",
            minlength:
              "<p style='color:red'>Your password must be at least 5 characters long</p>",
          },
          email: {
            required: "<p style='color:red'>Please provide a email</p>",
            email:
              "<p style='color:red'>Please enter a valid email address.</p>",
          },
        },
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if ((email == "", password == "")) {
    } else {
      const requestData = {
        email: email,
        password: password,
      };
      this.props.loginUser(requestData, (res) => {
        // console.log("^^^^^^^^^^^^^^^^^", res.data.role);
        if (res.status === 200) {
          localStorage.setItem("data", JSON.stringify(res.data.token));
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("localId", res.data._id);
          localStorage.setItem("role", res.data.role);
          if (res.data.role === true) {
            toast.success("Login Successfully");
            setTimeout(() => {
              window.location = "/dashboard";
            }, 1000);
          } else if (res.data.status === "approved") {
            toast.success("Login Successfully");
            setTimeout(() => {
              window.location = "/";
            }, 1000);
          } else {
            toast.warn("Admin doesn't Approved your account.");
          }
        } else {
          toast.error("Bad Credential..");
          // alert("Bad Credential..");
        }
      });
    }
  };
  render() {
    return (
      <div>
        <AppBar />
        <section
          className="vh-100"
          style={{ backgroundColor: "rgb(255 255 255)" }}
        >
          <div className="container h-100" style={{ marginTop: "50px" }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div
                        style={{
                          borderRight: "1px solid rgba(0, 255, 0, 0.5)",
                        }}
                        className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      >
                        <p
                          style={{ marginLeft: "40px !important" }}
                          className=" h1 mb-5 mx-1 mx-md-4 mt-4"
                        >
                          Sign In
                        </p>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <form
                          id="myform"
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
                                Email address*
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email address"
                                style={{
                                  padding: "15px",
                                  border: "1px solid #bfe9ae",
                                }}
                                value={this.state.email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                              />{" "}
                              <span id="demo2"></span>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            {/* <i className="fas fa-lock fa-lg me-3 fa-fw"></i> */}
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example4c"
                                style={{ color: "#6a5050" }}
                              >
                                Enter password*
                              </label>
                              <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                style={{
                                  padding: "15px",
                                  border: "1px solid #bfe9ae",
                                }}
                                value={this.state.password}
                                onChange={(e) =>
                                  this.setState({ password: e.target.value })
                                }
                              />{" "}
                              <span id="demo2"></span>
                            </div>
                          </div>
                          <p style={{ marginLeft: "14.8em" }}>
                            <Link to="/resetEmail">Forgot password?</Link>
                          </p>
                          {/* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; */}
                          <div
                            className="loginMarging mb-5"
                            style={{ marginLeft: "38px !important" }}
                          >
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3c"
                            />
                            <label
                              style={{ marginLeft: "0em !important" }}
                              // className="form-check-label"
                              for="form2Example3"
                            >
                              I agree to <a href="#!">terms & conditions</a>
                            </label>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              style={{
                                background: "#688f4e",
                                width: "19em",
                                border: "none",
                                position: "absolute",
                                bottom: "8px",
                                height: "50px",
                                left: "3em",
                              }}
                              className="btn btn-primary "
                              // onClick={this.handleSubmit}
                            >
                              Sign In
                            </button>
                            {/* )} */}
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <Box
                          sx={{
                            width: 300,
                            height: 300,
                            marginTop: "-20px",
                            marginLeft: " 92px",
                            backgroundColor: "primary.dark",
                            "&:hover": {
                              backgroundColor: "primary.main",
                              //   opacity: [0.9, 0.8, 0.7],
                            },
                          }}
                        >
                          <h3>Create Account</h3>

                          <p
                            style={{
                              color: "#877878",
                            }}
                          >
                            create account to manage orders
                          </p>
                          <Link to="/register">
                            <button
                              type="button"
                              style={{
                                background: "#688f4e",
                                border: "none",
                                width: "18em",
                                height: "55px",
                              }}
                              className="btn btn-primary "
                            >
                              Create Account
                            </button>
                          </Link>
                        </Box>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", padding: " 35px" }}>
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
  loginUser,
})(Login);
