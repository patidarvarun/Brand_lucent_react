import { Box, Container, Grid, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFooter } from "../../action/HomePageAction";
import { BASE_URL } from "../../config/config";
import Paper from "@mui/material/Paper";
import AppBar from "./AppBar";
import "./user.css";

function Footerr() {
  const getFootData = useSelector(
    (state) => state.allFooter.FootData.footerData
  );

  const [footDataa, setFootDataa] = useState([]);

  const dispatch = useDispatch();

  // console.log("$$$$$$$$$$$$$$$$$$$", footDataa);

  const getAllFooter = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getFooter`)
      .catch((err) => {});
    // console.log("%%%%%%%%%%%%%%%%%%", response);
    setFootDataa(response.data.footerData);
    dispatch(getFooter(response.data));
  };
  useEffect(() => {
    getAllFooter();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              background: "rgb(104, 143, 78)",
            }}
          >
            <div className="footer-main">
              <div className="footer-inner">
                <div className="services">
                  {footDataa
                    .filter((data) => data.labeloffooter == "Services")
                    .slice(0, 1)
                    .map((item) => (
                      <h3 className="textColor1">{item.labeloffooter}</h3>
                      // (<li>{console.log("*****************", item)}</li>)
                    ))}
                  {footDataa
                    .filter((data) => data.labeloffooter == "Services")
                    .map((item) => (
                      // <h3>{item.labeloffooter}</h3>
                      <p className="textColor">{item.title}</p>
                    ))}
                </div>
                <div className="services2 services">
                  {footDataa
                    .filter((data) => data.labeloffooter == "About")
                    .slice(0, 1)
                    .map((item) => (
                      <h3 className="textColor1">{item.labeloffooter}</h3>
                      // (<li>{console.log("*****************", item)}</li>)
                    ))}
                  {footDataa
                    .filter((data) => data.labeloffooter == "About")
                    .map((item) => (
                      // <h3>{item.labeloffooter}</h3>
                      <p className="textColor">{item.title}</p>
                    ))}
                </div>
                <div className="services3 services">
                  <div>
                    {footDataa
                      .filter((data) => data.labeloffooter == "Help")
                      .slice(0, 1)
                      .map((item) => (
                        <h3 className="textColor1">{item.labeloffooter}</h3>
                        // (<li>{console.log("*****************", item)}</li>)
                      ))}
                    {footDataa
                      .filter((data) => data.labeloffooter == "Help")
                      .map((item) => (
                        // <h3>{item.labeloffooter}</h3>
                        <p className="textColor">{item.title}</p>
                      ))}
                  </div>
                </div>
                <div className="services4 services">
                  <img
                    className="footerImage1"
                    src="/footer.png"
                    style={{ width: "250px", height: "100px" }}
                  />
                </div>
              </div>
              <div className="terms1">
                <div>
                  {footDataa
                    .filter(
                      (data) => data.labeloffooter == "Terms & Conditions"
                    )
                    .slice(0, 1)
                    .map((item) => (
                      <p className="textColor">{item.title}</p>
                    ))}
                </div>
                <div>
                  {footDataa
                    .filter((data) => data.labeloffooter == "Privacy Policy")
                    .slice(0, 1)
                    .map((item) => (
                      <p className="textColor">{item.title}</p>
                    ))}
                </div>

                <div className="emogi">
                  <Link to="#">
                    <FacebookIcon className="iconColor" />{" "}
                  </Link>
                  &emsp;
                  <Link to="#">
                    <TwitterIcon className="iconColor" />
                  </Link>
                  &emsp;
                  <Link to="#">
                    <InstagramIcon className="iconColor" />
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Footerr;
