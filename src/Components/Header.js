import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";

function Header({currentUser}) {
const [button, setButton] = useState(true)
  

    return ( 
      <div>
  <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
    <div className="container-fluid">
      <a href className="navbar-brand"><img src="img/logo.png" alt="" /></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/CreateJob">CreateJob</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/invoicecontainer">Invoices</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/TaxContainer">Tax</a>
          </li>
          {currentUser ? <li className="nav-item">
            <a className="nav-link" href="/SignUp">SignUp</a>
          </li> : null }
          {currentUser ? <li className="nav-item">
            <a className="nav-link" href="/Login">Login</a>
          </li> : null }
        </ul>
      </div>
    </div>
  </nav>
</div>

     ) }

     
      

export default Header
