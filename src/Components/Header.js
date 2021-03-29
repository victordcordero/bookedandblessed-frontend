import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
function Header({currentUser}) {
  
    return (
      <header class="navbar navbar-main navbar-expand-lg navbar-dark" id="navbar-main">
        <div class="container"> 
          <a className="nav-link" href="#">
          <Link to="/">Home</Link>
              </a>
          </div>
          <div>
            {currentUser ? (
              <>
              <a className="nav-link" href="#">
                <Link to="/profile">profile</Link>
              </a>
      
              <a className="nav-link" href="#">
                <Link to="/createjob"> create job</Link>
              </a>
          
            
              <a className="nav-link" href="#">
                <Link to="/invoice">invoice</Link>
              </a>
          
            
              <a className="nav-link" href="#">
                <Link to="/expense">expense</Link>
              </a>
          
            
              <a className="nav-link" href="#">
                <Link to="/invoicecontainer">invoicecontainer</Link>
              </a>
            
              
              <a className="nav-link" href="#">
                <Link to="/tax">tax</Link>
              </a>
              
              </>
            ) : (  
              <>  
            <a className="nav-link" href="#">
              <Link to="/login">login</Link>
            </a>
            <a className="nav-link" href="#">
              <Link to="/signup">signup</Link>
            </a>
            </>
            )}
            </div>
            </header>
    )
}

export default Header
