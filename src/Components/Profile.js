import Login from "../Components/Login"
import '../App.css';
import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import CreateInvoice from "./CreateInvoice"
function Profile({currentUser, currentJob, user, lastJob, setCurrentJob, setLastJob, jobs}) {
  const history = useHistory()
  console.log(jobs)
  
      function createJobNumber(e) {
          e.preventDefault()
          if (jobs.length > 1) {
          const lastJob = jobs[jobs.length - 1]
          let updatedJob = lastJob.job_number + 1
          setCurrentJob(updatedJob)
          
          fetch(`http://localhost:3000/jobs`, {
              method: "POST",
              headers: {
                  "Content-Type" : 'application/json'
              },
              body: JSON.stringify({job_number: updatedJob, user_id: user.id})
          })
          .then(response => response.json())
          .then(data => {
              setLastJob(data)
              history.push('/createinvoice')
          })
          }
      }

    return (
        currentUser && <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://images.squarespace-cdn.com/content/v1/5af01293697a98afe3594f36/1563438152456-TZBIRXYKJVJX3GH9C9AR/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/image-asset.jpeg?format=1500w" alt="First slide" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Booked&Blessed</h1>
              <button className="button button1" onClick={createJobNumber} >Start a Job</button>
            </div>
          </div>
          {/* <div className="carousel-item">
            <img className="d-block w-100" src="https://images.squarespace-cdn.com/content/v1/5af01293697a98afe3594f36/1526276982809-DK1PWUOUQB9O48T1VBRE/ke17ZwdGBToddI8pDm48kFUXhVpDNJypizh6DflS9gcUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dtiy9zaKxRkF1_T_ccQc48XJqMeC1FkTGFiQ8sR-FhpcG6v6ULRah83RgHXAWD5lbQ/finance+background.jpg?format=2500w" alt="Second slide" />
          </div> */}
          <div className="carousel-item">
            <img className="d-block w-100" src="https://wallpaperaccess.com/full/656665.jpg" alt="Third slide" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Booked&Blessed</h1>
              <button className="button button1" onClick={createJobNumber} >Start a Job</button>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      
    )
}

export default Profile
