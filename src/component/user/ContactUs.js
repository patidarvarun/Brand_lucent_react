import * as React from "react";
import { useState } from "react";
import AppBar from "./AppBar";
import Footerr from "./Footerr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";
import { API } from "../../config/config";
import axios from "axios";
toast.configure();

function authHeader() {
  const user = localStorage.getItem("data");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}
const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    const requestData = { name: name, email: email, message: message };
    axios
      .post(`${API.contactus}`, requestData, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            "Thankyou for your message. We will be in contact with you shortly."
          );
          setTimeout(() => {
            window.location = "/";
          }, 2000);
        } else {
          toast.warn("Something went wrong..");
        }
      });
    e.preventDefault();
  };

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
                        <form onSubmit={handleSubmit}>
                          <div className="md-form">
                            <label for="Form-email5" className="">
                              Your name
                            </label>
                            <input
                              type="text"
                              id="Form-email5"
                              name="name"
                              className="form-control white-text"
                              onChange={(e) => setName(e.target.value)}
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
                              name="email"
                              className="form-control"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <br />
                          <div className="md-form mb-5">
                            <label for="message5">Your message</label>
                            <textarea
                              type="text"
                              id="message"
                              name="message"
                              rows="3.5"
                              className="form-control md-textarea white-text"
                              onChange={(e) => setMessage(e.target.value)}
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
                                type="submit"
                                // onClick={handleSubmit}
                                className="btn btn-block btn-rounded z-depth-1 waves-effect waves-light buttonCsss"
                              >
                                Send message
                              </button>
                            </div>
                          </div>
                        </form>
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
