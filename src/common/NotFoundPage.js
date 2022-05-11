import * as React from "react";
import "../../src/component/user/user.css";

const NotFoundPage = () => {
  return (
    <div className="notfound">
      <p className="err">404</p>
      <h1 className="err1">WE ARE SORRY, PAGE NOT FOUND!</h1>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => (window.location = "/")} className="errcss">
          BACK TO HOMEPAGE
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
