import * as React from "react";
import AppBar from "./AppBar";
import Footerr from "./Footerr";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";

toast.configure();

const ContactUs = () => {
  return (
    <>
      <body>
        <div className="container-scroller">
          <AppBar />
          <div style={{ marginTop: "5em" }} className="">
            <div className="maind" style={{ padding: "10px" }}>
              <div className="secondMain">
                <div className="col-md-12 col-lg-4 " style={{ margin: "auto" }}>
                  <section className="form-dark">
                    <div className="card card-image">
                      <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-2">
                        <div className="text-center">
                          <h3 className="white-text mb-5 mt-4 font-weight-bold">
                            <strong style={{ color: "white" }}>CONTACT</strong>{" "}
                            <strong style={{ color: "rgb(84 183 18)" }}>
                              US
                            </strong>
                          </h3>
                        </div>
                        <div className="md-form">
                          <label for="Form-email5" className="">
                            Your name
                          </label>
                          <input
                            type="text"
                            id="Form-email5"
                            className="form-control white-text"
                          />
                        </div>
                        <br />
                        <div className="md-form">
                          <label for="Form-pass5" className="">
                            Your mail
                          </label>
                          <input
                            type="text"
                            id="Form-pass5"
                            className="form-control"
                          />
                        </div>
                        <br />
                        <div className="md-form mb-5">
                          <label for="message5">Your message</label>
                          <textarea
                            type="text"
                            id="message5"
                            name="message5"
                            rows="3.5"
                            className="form-control md-textarea white-text"
                          ></textarea>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkbox7"
                            />
                            <label
                              for="checkbox7"
                              className="form-check-label white-text"
                            >
                              Subscribe to our
                              <a
                                href="#"
                                className="green-text font-weight-bold"
                              >
                                {" "}
                                newsletter?
                              </a>
                            </label>
                          </div>
                        </div>

                        <div className="row d-flex align-items-center">
                          <div className="text-center mb-3 col-md-12">
                            <button
                              type="button"
                              className="btn btn-block btn-rounded z-depth-1 waves-effect waves-light buttonCsss"
                            >
                              Send message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footerr />
      </body>
    </>
  );
};

export default ContactUs;
