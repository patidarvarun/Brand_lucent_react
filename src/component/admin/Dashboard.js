import React, { Component } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { connect } from "react-redux";
import { userDetail,deleteUser,getUserDetail } from "../../action/index";
import "../../style/vendors/feather/feather.css";
import "../../style/vendors/ti-icons/css/themify-icons.css";
import "../../style/vendors/css/vendor.bundle.base.css";
import "../../style/vendors/datatables.net-bs4/dataTables.bootstrap4.css";
import "../../style/vendors/ti-icons/css/themify-icons.css";
import "../../style/js/select.dataTables.min.css";
import "../../style/css/vertical-layout-light/style.css";
import "../../style/images/favicon.png";
import "../../style/css/sidebar.css";



class Dashboard extends Component {
  state = {
    userData: [],
  };

  componentDidMount() {
		this.handleGetUser();
	}
	
	handleGetUser(){
		this.props.userDetail((res) => {
			this.setState({ userData: res.data.users });
		});
	}
  
  render() {
    const pendinglength = this.state.userData.filter(e => e.status.includes("pending"))
    return (
      <>
        <body>
        <div className="container-scroller">
           <TopNav /> 

          <div className="container-fluid page-body-wrapper">
             <Sidebar /> 
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="row">
                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                      <h3 className="font-weight-bold">Welcome {localStorage.getItem("name")}</h3>
                      <h6 className="font-weight-normal mb-0">
                        All systems are running smoothly! You have{" "}
                        <span className="text-primary">3 unread alerts!</span>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 grid-margin transparent">
                  <div className="row" style={{ flexWrap: "nowrap" }}>
                    <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                      <div
                        className="card card-tale sub-card"
                        style={{ backgroundColor: "#B1D182" }}
                      >
                        <div className="card-body">
                          <p className="mb-4">Total User's</p>
                          <p className="fs-30 mb-2">{pendinglength.length}</p>
                          <p>Pending User</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                      <div
                        className="card card-dark-blue sub-card"
                        style={{ backgroundColor: "#2B463C" }}
                      >
                        <div className="card-body">
                          <p className="mb-4">Total Order</p>
                          <p className="fs-30 mb-2">61344</p>
                          <p>Total Earning</p>
                        </div>
                      </div>
                    </div>
                    {/* </div>
                            <div className="row"> */}
                    <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                      <div
                        className="card card-light-blue sub-card"
                        style={{ backgroundColor: "#688F4E" }}
                      >
                        <div className="card-body">
                          <p className="mb-4">Total Products</p>
                          <p className="fs-30 mb-2">3404</p>
                          <p>Parcel Approval</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 stretch-card transparent">
                      <div className="card card-light-danger sub-card">
                        <div className="card-body">
                          <p className="mb-4">Number of User's</p>
                          <p className="fs-30 mb-2">{this.state.userData.length}</p> 
                          {/* <p>0.22% (30 days)</p>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card sub-card ">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p className="card-title card-sub-title">
                          Recent Orders
                        </p>
                        <a href="#" className="text-secondary view-sec">
                          View all
                        </a>
                      </div>
                      <p className="">Overview of last 5 recent orders.</p>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Order Name</th>
                            <th scope="col">Order Price</th>
                            <th scope="col">Order Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>image</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>image</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>image</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card sub-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p className="card-title card-sub-title">
                          Recent Products
                        </p>
                        <a href="#" className="text-secondary view-sec">
                          View all
                        </a>
                      </div>
                      <p className="">Overview of last 5 recent products.</p>
                      {/* <div id="sales-legend" className="chartjs-legend mt-4 mb-2"> */}
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Product Id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>image</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>image</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>image</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card sub-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p className="card-title card-sub-title">User Lists</p>
                        <a href="/userlists" className="text-secondary view-sec">
                          View all
                        </a>
                      </div>
                      <p className="">
                        Overview of last 5 recent user register.
                      </p>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">User Id</th>
                            <th scope="col">User Name</th>
                            <th scope="col">User Status</th>
                            <th scope="col">User Profile</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.userData.splice(0,5).map((item) => {
                         
                        return (
                          <>
                          <tr key={item._id}>
                            <td scope="row">{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                          </tr>
                        </>
                          );
								        })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </body>
      </>
    );
  }
}

const mapStateToProps = (store) => {
	return {};
};
export default connect(mapStateToProps, {
	userDetail,deleteUser,getUserDetail
})(Dashboard);

