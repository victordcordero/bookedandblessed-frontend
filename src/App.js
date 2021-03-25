import React, {useEffect, useState} from "react"
import './App.css';
import Body from "./Components/Body"
import Navbar from "./Components/Navbar";
import Button from './Components/Button';
import Header from './Components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Job from "./Components/Job";
import Invoice from "./Components/Invoice";
import Expense from "./Components/Expense";
import Expenses from "./Components/Expenses";
import ExpensesArray from "./Components/ExpensesArray";
import Invoices from "./Components/Invoices";

function App() {
  const [user, setUser] = useState(null)
  const [currentUser, setcurrentUser] = useState([])
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
    <div>
      <Header user={user}></Header>
        <Switch>
          <Route path="/job">
            <Job currentJob={currentJob} user={user} lastJob={lastJob} setLastJob={setLastJob} setCurrentJob={setCurrentJob}></Job>
          </Route>
            <Route path="/invoice">
            <Invoice currentJob={currentJob} lastJob={lastJob} invoiceData={invoiceData} setInvoiceData={setInvoiceData}></Invoice>
          </Route>
          <Route path="/Expense">
            <Expense currentJob={currentJob} lastJob={lastJob} invoiceData={invoiceData} ></Expense>
          </Route>
          <Route path="/Expenses">
            <Expenses currentUser={currentUser}></Expenses>
          </Route>
          <Route path="/ExpensesArray">
            <ExpensesArray currentUser={currentUser}></ExpensesArray>
          </Route>
          <Route path="/Invoices">
            { user && <Invoices user={user} invoices={invoices} setInvoices={setInvoices} onUpdateClient={handleUpdateClient}></Invoices> }
            </Route>
        </Switch>
    
        </div>
  )
}

export default App;
