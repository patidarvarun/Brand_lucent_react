import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Logout() {
  useEffect(() => {
    localStorage.clear("data");
    toast.success("LogOut Successfully");
    setTimeout(() => {
      window.location = "/";
    }, 1000);
  }, []);

  // return <div></div>;
}

export default Logout;
