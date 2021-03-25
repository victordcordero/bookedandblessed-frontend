import React, {useEffect, useState} from "react"
import './App.css';
import Body from "./Components/Body"
import Header from './Components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import CreateJob from "./Components/CreateJob";
import Invoice from "./Components/Invoice";
import Expense from "./Components/Expense";
import Invoices from "./Components/Invoices";

function App() {
  const [user, setUser] = useState(null)
  const [invoices, setInvoices] = useState([])
  const [currentJob, setCurrentJob] = useState(0)
  const [lastJob, setLastJob] = useState([])
  const [invoiceData, setInvoiceData] = useState({
    rate:"", 
    days_worked:"", 
    client: "", 
    job_id: "",
    job_number: "",
    amount: "",
})


console.log(user)

useEffect(() => {
  fetch('http://localhost:3000/users/1')
  .then(response => response.json())
  .then(data => {
    setUser(data[0])
    setInvoices(data[0].invoices)
  })
}, [])



function handleUpdateClient(updatedClient) {
  console.log(updatedClient.client)
  const updatedClientArray = invoices.map((invoice) => {
    if(invoice.id === updatedClient.id) {
      return updatedClient; 
    } else {
      return invoice;
    }
  });
  setInvoices(updatedClientArray);
  } 
  
  return (
    <div className="App">
      <Header user={user}></Header>
        <Switch>
          <Route exact path="/CreateJob">
            <CreateJob currentJob={currentJob} user={user} lastJob={lastJob} setLastJob={setLastJob} setCurrentJob={setCurrentJob}></CreateJob>
          </Route>
            <Route exact path="/invoice">
            <Invoice currentJob={currentJob} lastJob={lastJob} invoiceData={invoiceData} setInvoiceData={setInvoiceData}></Invoice>
          </Route>
          <Route exact path="/Expense">
            <Expense currentJob={currentJob} lastJob={lastJob}></Expense>
          </Route>
          <Route exact path="/Invoices">
            { user && <Invoices user={user} invoices={invoices} setInvoices={setInvoices} onUpdateClient={handleUpdateClient}></Invoices> }
            </Route>
        </Switch>
    
        </div>
  )
}

export default App;
