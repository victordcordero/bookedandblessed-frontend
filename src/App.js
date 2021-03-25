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
import CreateInvoice from "./Components/CreateInvoice";
import CreateExpense from "./Components/CreateExpense";
import InvoiceContainer from "./Components/InvoiceContainer";

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
    console.log(data[0].invoices)
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
            <Route exact path="/CreateInvoice">
            <CreateInvoice currentJob={currentJob} lastJob={lastJob} invoiceData={invoiceData} setInvoiceData={setInvoiceData}></CreateInvoice>
          </Route>
          <Route exact path="/CreateExpense">
            <CreateExpense currentJob={currentJob} lastJob={lastJob}></CreateExpense>
          </Route>
          <Route exact path="/InvoiceContainer">
            { user && <InvoiceContainer user={user} invoices={invoices} setInvoices={setInvoices} onUpdateClient={handleUpdateClient}></InvoiceContainer> }
            </Route>
        </Switch>
    
        </div>
  )
}

export default App;
