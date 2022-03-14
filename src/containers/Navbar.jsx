import React from "react";
import Identicon from "identicon.js";
import icon from "../icon.png";

function Navbar({ account }) {
  return (
    <nav className="navbar navbar-light sticky-top bg-light flex-md-nowrap shadow">
      <div className="container d-block d-md-flex align-items-center justify-content-between">
        <div className="navbar-brand col-sm-3 col-md-2 mr-0 d-flex">
          <img
            src={icon}
            alt="Icon"
            width={30}
            height={30}
            style={{ marginRight: 5 }}
          />
          <a href="/" className="text-dark text-decoration-none">
            <h3>DApp Forms</h3>
          </a>
        </div>
        <div>
          <span className="text-secondary">{account}</span>
          {account && (
            <img
              className="ml-2"
              width="30"
              height="30"
              src={`data:image/png;base64,${new Identicon(
                account,
                30
              ).toString()}`}
              alt="Avatar"
              style={{ borderRadius: 30, marginLeft: 10 }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
