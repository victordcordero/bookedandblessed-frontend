import React, {useEffect, useState, PureComponent} from "react"
import { useHistory } from "react-router-dom";
import '../App.css';
function Login({ setCurrentUser }) {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
    const [errors, setErrors] = useState([]);
    const history = useHistory();
  
    function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      // request => POST /login
      console.log(formData)
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw data;
            });
          }
        })
        .then((data) => console.log(data))
        // .then((data) => {
        //   // set the user in state
        //   setCurrentUser(data.user);
        //   // save the token!
        //   localStorage.setItem("token", data.token);
        //   // redirect!
        //   history.push("/");
        // })
        // .catch((data) => {
        //   setErrors(data.errors);
        // });
    }
  
    function goHome() {
      history.push("/profile")
      console.log("hi")
    }
    return (
      <form >
        
       <div className="container-fluid padding" >
       
       <div class="row">
         
  <div class="col">
  <div className="d-flex justify-content-center">
       <div className="col-md-3" margin-left="1000px">
      <div className="card" margin-left="1000px">
        <div className="card-body" margin-left="1000px">
          
      <div class="form-outline mb-4">
        <input type="email" id="form1Example1" class="form-control" />
        <label class="form-label" for="form1Example1">Email address</label>
      </div>
    
     
      <div class="form-outline mb-4">
        <input type="password" id="form1Example2" class="form-control" />
        <label class="form-label" for="form1Example2">Password</label>
      </div>
    
      
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
        
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="form1Example3"
              checked
            />
            <label class="form-check-label" for="form1Example3"> Remember me </label>
          </div>
        </div>
    
        <div class="col">
          
          <a href="#!">Forgot password?</a>
        </div>
      </div>
    
    
      <button type="submit" onclick={goHome} class="btn btn-primary btn-block">Sign in</button>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </form>
      
 

    );
  }

export default Login
 