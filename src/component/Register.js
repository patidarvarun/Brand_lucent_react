import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import validate from "jquery-validation";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box } from "@mui/system";
import AppBar from "../component/user/AppBar";
import { connect } from "react-redux";
import { createUser } from "../action/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js" />
</head>;

class Register extends Component {
  constructor(props) {
    super(props);
    // this.state = initialState;
    this.state = {
      name: "",
      phone: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    $(document).ready(function () {
      $("#regvalidation").validate({
        rules: {
          name: {
            required: true,
            // rangelength: [2, 10],
          },
          phone: { required: true, digits: true, minlength: 10, maxlength: 10 },

          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            minlength: 5,
          },
        },
        messages: {
          name: {
            required: "<p style='color:red'>Please enter your fullname</P>",
            // rangelength:
            //   "<p style='color:red'>Your name must consist of at least 2 characters</p>",
          },

          phone: {
            // required: "<p style='color:red'>Please enter your phone Number</p>",
            required: "<p style='color:red'>Please enter phone number</p>",
            digits: "<p style='color:red'>Please enter valid phone number</p>",
            minlength:
              "<p style='color:red'>Phone number field accept only 10 digits</p>",
            maxlength:
              "<p style='color:red'>Phone number field accept only 10 digits</p>",
            // minlength: "<p style='color:red'>Your phone number must consist of at least 2 characters</p>"
          },
          email: {
            required: "<p style='color:red'>Please provide a email</p>",
            email:
              "<p style='color:red'>Please enter a valid email address.</p>",
          },
          password: {
            required: "<p style='color:red'>Please provide a password</p>",
            minlength:
              "<p style='color:red'>Your password must be at least 5 characters long</p>",
          },
        },
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, password } = this.state;
    if ((name != "", email != "", password != "", phone != "")) {
      const requestData = {
        // role: "true",
        name: name,
        phone: phone,
        email: email,
        password: password,
      };
      this.props.createUser(requestData, (res) => {
        if (res.status === 200) {
          toast.success("Create User Successfully");
          window.location.replace("/login");
          // console.log("Success*****OOOOOOOOOOOOOOOOOOOOO213232", res);
        } else if (res.status === 400) {
          // toast.error(res.data.message);
        }
      });
    } else {
      // toast.error("error please fill all fields!");
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
          <div className="container h-100" style={{ marginTop: "70px" }}>
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
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Create Account
                        </p>

                        <form
                          id="regvalidation"
                          className="mx-1 mx-md-4"
                          noValidate="novalidate"
                          onSubmit={this.handleSubmit}
                        >
                          <div className="d-flex flex-row align-items-center mb-4">
                            {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="name"
                                style={{ color: "#6a5050" }}
                              >
                                Your fullname*
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                style={{
                                  padding: "15px",
                                  border: "1px solid #bfe9ae",
                                }}
                                className="form-control"
                                placeholder="Enter your fullname"
                                value={this.state.name}
                                onChange={(e) =>
                                  this.setState({ name: e.target.value })
                                }
                              />
                              {""}
                              <span id="demo2"></span>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example3c"
                                style={{ color: "#6a5050" }}
                              >
                                Your Phone Number*
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                style={{
                                  padding: "15px",
                                  border: "1px solid #bfe9ae",
                                }}
                                className="form-control"
                                placeholder="+254"
                                value={this.state.phone}
                                onChange={(e) =>
                                  this.setState({ phone: e.target.value })
                                }
                              />
                              <span id="demo2"></span>
                            </div>
                          </div>

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
                              />
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
                                Create password
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

                          <div className="mb-5 loginMarging">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3c"
                            />
                            <label
                              className="form-check-label"
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
                                width: "-webkit-fill-available",
                                border: "none",
                                height: "53px",
                              }}
                              className="btn btn-primary "
                              // onClick={this.handleSubmit}
                            >
                              Register Account
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <Box
                          sx={{
                            width: 300,
                            height: 300,
                            marginTop: "-180px",
                            marginLeft: " 92px",
                            backgroundColor: "primary.dark",
                            "&:hover": {
                              backgroundColor: "primary.main",
                              //   opacity: [0.9, 0.8, 0.7],
                            },
                          }}
                        >
                          <h3>Sign In</h3>

                          <p
                            style={{
                              color: "#877878",
                            }}
                          >
                            Login to manage orders
                          </p>
                          <Link to="/login">
                            <button
                              type="button"
                              style={{
                                background: "#688f4e",
                                border: "none",
                                width: "18em",
                                height: "55px",
                                position: "absolute",
                                width: "19.3em",
                                bottom: " 26em",
                                // left: "5.3em",
                              }}
                              className="btn btn-primary "
                            >
                              Login
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
  createUser,
})(Register);
