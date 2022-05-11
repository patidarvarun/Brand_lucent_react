import React from "react";
import TopNav from "../admin/TopNav";

function UserDashboard() {
  return (
    <div className="container-scroller">
      <TopNav />
      <div style={{ position: "absolute", top: "55px" }}>
        <h1>UserDashboard</h1>
      </div>
    </div>
  );
}

export default UserDashboard;
