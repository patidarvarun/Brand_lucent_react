import React, { Component } from "react";
import $ from "jquery";
import validate from "jquery-validation";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import {createUser} from "../../action/index";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { red } from "@mui/material/colors";
toast.configure();

<head>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
</head>


class AddUser extends Component {
    state = {
        name: "",
        contact:"",
        email:"",
        password: "",
    };

      handleSubmit = (e) => {
        e.preventDefault();

        $(document).ready(function () {
            $("#myform").validate({
                rules: {
                    password: {
                        required: true,
                        minlength: 5,
                    },
                    email: {
                        required: true,
                    },
                    name: {
                        required: true,
                    },
                    contact: {
                        required: true,
                    },
                },
                messages: {
                    password: {
                        required: "<p style='color:red'>Please provide a password</p>",
                        minlength: "<p style='color:red'>Your password must be at least 5 characters long</p>",
                    },
                    email: {
                        required: "<p style='color:red'>Please provide a email</p>",
                     },
                    name: {
                        required: "<p style='color:red'>Please provide a name</p>",
                    },
                    contact: {
                        required: "<p style='color:red'>Please provide a contact number</p>",
                    },
                },
            });
        });

        
        const { name,contact,email, password } = this.state;
        if(name !==  "" || contact !== "" ||  email !== "" ||  password !==  "" ){
          const requestData = {
            role: "true",
            name:name,
            phone:contact,
            email: email,
            password: password,
          };
            this.props.createUser(requestData, (res) => {
                if (res.status === 200) {
                    toast.success("User Created Successfully");
                    window.location.replace("/userlists");
                }
                else if(res.status === 400){
                    toast.error(res.data.message)
                }
               
                
          });
        }
      };


    render() {
        return (
            <div className="container-scroller">
                <TopNav /> 
 
           <div className="container-fluid page-body-wrapper">
              <Sidebar /> 
           <div className="main-panel formalign">
            <span className="heading ml-4 ">Add User</span>
                <form
                    id="myform"
                    className="mx-1 mx-md-4 myFormCss"
                    noValidate="novalidate"
                    onSubmit={this.handleSubmit}
                >
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                for="name"
                            >
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter Name"
                                value={this.state.name}
                                onChange={(e) =>
                                    this.setState({ name: e.target.value })
                                }
                            />{" "}
                            <span id="demo2"></span>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                for="Contact"
                            >
                                Contact *
                            </label>
                            <input
                                type="contact"
                                id="Contact"
                                name="contact"
                                className="form-control"
                                placeholder="Enter Contact"
                                value={this.state.contact}
                                onChange={(e) =>
                                    this.setState({ contact: e.target.value })
                                }
                            />{" "}
                            <span id="demo2"></span>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3">
                        <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                for="email"
                            >
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                            />{" "}
                            <span id="demo2"></span>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3">
                        <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label"
                                for="password"
                            >
                                Password *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={(e) =>
                                    this.setState({ password: e.target.value })
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
    // const { auth, profile } = store;
    return {};
};
export default connect(mapStateToProps, {
    createUser,
})(AddUser);