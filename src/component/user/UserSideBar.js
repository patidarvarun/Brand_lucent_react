import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { BASE_URL } from "../../config/config";

function authHeader() {
  const user = localStorage.getItem("data");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}
const Sidebar = (props) => {
  // console.log("props#############", props);
  const [checked, setChecked] = React.useState(false);
  const [cat, setCat] = useState([]);

  const getCategories = async () => {
    const response = await axios
      .get(`${BASE_URL}/api/getCategory`, {
        headers: authHeader(),
      })
      .catch((err) => {});
    setCat(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange1 = (e) => {
    if (e.target.value == "all") {
      window.location.replace("/allProduct");
      setChecked(e.target.checked);
    }
  };

  const handleChange = (id) => {
    window.location.replace("/productPage/" + id);
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebarColor">
        <h2>Category</h2>
        <Checkbox
          value="all"
          // checked={checked}
          onClick={handleChange1}
          inputProps={{ "aria-label": "controlled" }}
        />
        All
        {cat.map((items) => (
          <div>
            <a href={`/productPage/${items._id}`}>
              {" "}
              <Checkbox
                // checked={checked}
                onClick={() => handleChange(items._id)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </a>
            {items.name}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
