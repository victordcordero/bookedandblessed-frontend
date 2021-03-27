import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
function Header() {

    return (
        <div className="Header">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <Link to="/createjob"> create job</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/invoice">invoice</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/expense">expense</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/invoicecontainer">invoicecontainer</Link>
              </a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/tax">tax</Link>
              </a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/login">login</Link>
              </a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/signup">signup</Link>
              </a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/signup">signup</Link>
              </a>
              </li>
          </ul>
        </div>
    )
}

export default Header
