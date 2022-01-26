import React from 'react';
import "./NavBar.css";

function NavBar(props) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div>
            <h1 className="display-4 text-white">Stickman Vendor </h1>
        </div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{props.account}</span></small>
            </li>
          </ul>
    </nav>
  );
}

export default NavBar;
