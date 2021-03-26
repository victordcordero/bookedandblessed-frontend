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
import Tax from "./Components/TaxContainer";

function App() {
  const [user, setUser] = useState(null)
  const [invoices, setInvoices] = useState([])
  const [jobs, setJobs] = useState([])
  const [expenses, setExpenses] = useState([])
  const [tax, setTax] = useState([])
  const [newExpense, setNewExpense] = useState([])
  const [currentJob, setCurrentJob] = useState(0)
  const [currentInvoice, setCurrentInvoice] = useState([])
  const [lastJob, setLastJob] = useState([])
  const [invoiceData, setInvoiceData] = useState({
    rate:"", 
    days_worked:"", 
    client: "", 
    job_id: "",
    job_number: "",
    amount: "",
})

function addExpenseToInvoice(newExpense, lastJob) {
  const newInvoices = invoices.map( invoice => {
    if ( invoice.id !== lastJob ) return invoice
    {return {...invoice, expenses: [ ...invoice.expenses, ...newExpense ]
  } }})
  setInvoices(newInvoices)
}


useEffect(() => {
  fetch('http://localhost:3000/users/1')
  .then(response => response.json())
  .then(data => {
    setUser(data[0])
    setInvoices(data[0].invoices)
    let userExpenses = data[0].invoices.map((expense) => expense.expenses)
    setExpenses(userExpenses) 
    setTax(data[0].taxes)
  })
}, [])


useEffect(() => {
  fetch('http://localhost:3000/jobs')
  .then(response => response.json())
  .then(data => {
  setJobs(data)
  })
}, [])
console.log(tax, "tax")
console.log(invoices, "invoice")
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
            <CreateJob currentJob={currentJob} user={user} lastJob={lastJob} setLastJob={setLastJob} setCurrentJob={setCurrentJob} jobs={jobs} setJobs={setJobs}></CreateJob>
          </Route>
            <Route exact path="/CreateInvoice">
            <CreateInvoice currentJob={currentJob} lastJob={lastJob} invoiceData={invoiceData} setInvoiceData={setInvoiceData} setInvoices={setInvoices} invoices={invoices} setCurrentInvoice={setCurrentInvoice}></CreateInvoice>
          </Route>
          <Route exact path="/CreateExpense">
            <CreateExpense currentJob={currentJob} lastJob={lastJob} setExpenses={setExpenses} expenses={expenses} currentInvoice={currentInvoice} setCurrentInvoice={setCurrentInvoice} newExpense={newExpense} setNewExpense={setNewExpense} addExpenseToInvoice={addExpenseToInvoice}></CreateExpense>
          </Route>
          <Route exact path="/InvoiceContainer">
            { user && expenses && <InvoiceContainer newExpense={newExpense} user={user} invoices={invoices} setInvoices={setInvoices} onUpdateClient={handleUpdateClient} expenses={expenses} tax={tax} setTax={setTax}></InvoiceContainer> }
            </Route>
            <Route exact path="/tax">
            <Tax tax={tax}></Tax> 
            </Route>
        </Switch>
    
        </div>
  )
}

export default App;
