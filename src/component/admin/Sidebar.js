import React from "react";
import Accordion from "react-bootstrap/Accordion";

const Sidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className="acc-item">
          <Accordion.Header className="acc-nav">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                <i className="icon-grid menu-icon"></i>
                <span className="menu-title"> Dashboard</span>
              </a>
            </li>
          </Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="acc-item">
          <Accordion.Header className="acc-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#ui-basic"
                aria-expanded="false"
                aria-controls="ui-basic"
              >
                <i className="icon-layout menu-icon"></i>
                <span className="menu-title"> Site Manager</span>
                <i className="menu-arrow"></i>
              </a>
            </li>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <ul>
                <li className="nav-item">
                  <a className="nav-link" href="/header">
                    Header
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/bannerList">
                    Banner
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/newsletter">
                    NewsLetter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/footer">
                    Footer
                  </a>
                </li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="acc-item">
          <Accordion.Header className="acc-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#form-elements"
                aria-expanded="false"
                aria-controls="form-elements"
              >
                <i className="icon-columns menu-icon"></i>
                <span className="menu-title"> Ecommerce</span>
                <i className="menu-arrow"></i>
              </a>
            </li>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <ul>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/productDetails">
                    {" "}
                    Product Details{" "}
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/offerDetail">
                    {" "}
                    Product Offers{" "}
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/categoryDetails">
                    {" "}
                    Category Details{" "}
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/orderDetail">
                    {" "}
                    Order Details{" "}
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/contactUsDetail">
                    {" "}
                    ContactUs Details{" "}
                  </a>
                </li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" className="acc-item">
          <Accordion.Header className="acc-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#auth"
                aria-expanded="false"
                aria-controls="auth"
              >
                <i className="icon-head menu-icon"></i>
                <span className="menu-title"> User Pages</span>
                <i className="menu-arrow"></i>
              </a>
            </li>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <ul>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/userlists">
                    {" "}
                    User Lists{" "}
                  </a>
                </li>
                {/* <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              href="pages/samples/register.html"
                            >
                              {" "}
                              Register{" "}
                            </a>
                          </li> */}
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </nav>
  );
};

export default Sidebar;
