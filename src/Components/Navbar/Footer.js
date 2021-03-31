import React from 'react'

function Footer() {
    return (
        <div className="container-fluid padding">
        <div className="row text-center">
          <div className="col-md-4">
            {/* <img src="img/w3newbie.png" /> */}
            <hr className="light" />
            <p>555-555-5555</p>
            <p>email@myemail.com</p>
            <p>100 Street Name</p>
            <p>City, State, 00000</p>
          </div>
          <div className="col-md-4">
            <hr className="light" />
            <h5>Our hours</h5>
            <hr className="light" />
            <p>Monday: 9am to 5pm</p>
            <p>Saturday: 10am to 4pm</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="col-md-4">
            <hr className="light" />
            <h5>Service Area</h5>
            <hr className="light" />
            <p>City, State, 00000</p>
            <p>City, State, 00000</p>
            <p>City, State, 00000</p>
            <p>City, State, 00000</p>
          </div>
          <div className="col-12">
            <hr className="light-100" />
            <h5>© w3newbie.com</h5>
          </div>
        </div>
      </div>
      
    )
}

export default Footer
